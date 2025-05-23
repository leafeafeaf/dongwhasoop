# # services/tts_service_worker.py

from zonos.model import Zonos
from zonos.conditioning import make_cond_dict
from zonos.utils import DEFAULT_DEVICE as device
import time
import tempfile
import uuid
from services.s3_utils import upload_file_to_s3, load_file_from_s3
from datetime import datetime,timezone
import asyncio # 병렬 실행
import os
import torch, torchaudio, uuid, os, tempfile, json
from zonos.model import Zonos
from zonos.conditioning import make_cond_dict
import asyncio

from db.db import AsyncSessionLocal
from db.models import story_pages, user_voices, page_audios
from sqlalchemy import select, and_, outerjoin, null, insert
from kafka_utils.producer import send_result_message, start_producer,stop_producer


# Index: [행복, 슬픔, 역겨움, 공포, 놀람, 분노, 기타1, 기타2]
emotion = {
    1: [0.6, 0.05, 0.05, 0.05, 0.1, 0.05, 0.05, 0.05],  # 행복
    2: [0.05, 0.6, 0.1, 0.1, 0.05, 0.05, 0.025, 0.025],  # 슬픔
    3: [0.05, 0.1, 0.6, 0.05, 0.05, 0.05, 0.05, 0.05],  # 역겨움
    4: [0.05, 0.1, 0.05, 0.6, 0.1, 0.05, 0.025, 0.025],  # 공포
    5: [0.1, 0.05, 0.05, 0.1, 0.6, 0.05, 0.025, 0.025],  # 놀람
    6: [0.05, 0.05, 0.05, 0.05, 0.05, 0.7, 0.025, 0.025],  # 분노
    7: [0.05, 0.05, 0.05, 0.05, 0.1, 0.05, 0.6, 0.05],    # 기타1 (몽환, 평온 등)
    8: [0.1, 0.1, 0.05, 0.1, 0.1, 0.1, 0.15, 0.3],        # 기본(중립)
}

device = "cuda" if torch.cuda.is_available() else "cpu"

def run_worker_process(queue, worker_id):
    asyncio.run(run_worker_loop(queue, worker_id))

async def run_worker_loop(queue, worker_id):
  print(f"🎤 TTS 워커 {worker_id} 시작")
  os.makedirs("/tmp", exist_ok=True)
  model = Zonos.from_pretrained("Zyphra/Zonos-v0.1-transformer", device=device)
  await start_producer()

  print("모델 로딩 성공")
  try:
    while True:
      task = queue.get()
      if task == "STOP":
            print(f"👋 워커{worker_id} 종료됨")
            break
      try:
        book_id = task["book_id"]
        voice_id = task["voice_id"]
        user_id = task["user_id"]

        print(f"📦 워커{worker_id} 처리 시작: book_id={book_id}, user_id={user_id}")

        async with AsyncSessionLocal() as session:
          print(f"세션 타입: {type(session)}")

          # 유저 보이스 URL 불러오기
          result = await session.execute(
            select(user_voices).where(user_voices.c.voice_id == voice_id)
          )
          voice = result.mappings().one_or_none() or {}
          
          print("목소리 url db에서 불러오기 성공")
      
          if not voice:
            raise Exception(f"❌ voice_id={voice_id} not found")

          # s3음성 다운로드
          speaker_wav_key = voice["voice_url"]
          speaker_path = _download_speaker(speaker_wav_key)
      
          # 음성이 없는 페이지 가져오기
          result = await session.execute(
                    select(story_pages)
                    .select_from(
                        outerjoin(
                            story_pages,
                            page_audios,
                            and_(
                                story_pages.c.book_id == page_audios.c.book_id,
                                story_pages.c.page_number == page_audios.c.page_number,
                                page_audios.c.voice_id == voice_id,
                         )
                      )
                  )
                  .where(
                      and_(
                          story_pages.c.book_id == book_id,
                          page_audios.c.audio_id.is_(None)
                     )
                  )
              )
          rows = result.fetchall()
          pages = [dict(row._mapping) for row in rows]

          # TTS 모델 사용해서 음성 생성
          # 생성된 음성 S3 및 MySQL보내기
          print(f"음성 생성 시작: {len(pages)}개")

          for page in pages:
              await _process_one_page(session, model, book_id, voice_id, page, speaker_path)

          await session.commit()
          print(f"✅ 워커{worker_id} 처리 완료: book_id={book_id}")

          # producer로 결과 메시지를 보낸다.
          await send_result_message({
              "type": "TTS_COMPLETE",
              "payload": {
              "book_id": book_id,
              "voice_id": voice_id,
              "user_id": user_id,
              }
            })
      except Exception as e:
        print(f"❌ 워커{worker_id} 에러: {e}")
        await send_result_message({
          "type": "TTS_FAILED",
          "payload": {
            "book_id": task.get("book_id"),
            "voice_id": task.get("voice_id"),
            "user_id": task.get("user_id"),
            "error": str(e),
            }
          })
  finally:
     await stop_producer()
     print(f"🛑 워커{worker_id} 프로듀서 종료됨")
      
        

def _download_speaker(s3_key: str) -> str:
    with tempfile.NamedTemporaryFile(delete=False, suffix=".wav", dir="/tmp") as temp:
        temp.write(load_file_from_s3(s3_key))
        return temp.name


async def _process_one_page(session, model, book_id, voice_id, page, speaker_path):
    text = page["text_content"]
    page_number = page["page_number"]
    emotion_type = page.get("emotion_type", 8)

    if not (1 <= emotion_type <= 8):
        emotion_type = 8

    output_path = f"/tmp/{uuid.uuid4()}.wav"

    # 보이스 클로닝
    wav, sr = torchaudio.load(speaker_path)
    speaker = model.make_speaker_embedding(wav.to(device), sr)

    cond = make_cond_dict(text=text, speaker=speaker, language="ko", emotion=emotion[emotion_type])
    conditioning = model.prepare_conditioning(cond)
    codes = model.generate(conditioning)
    wavs = model.autoencoder.decode(codes).cpu()
    torchaudio.save(output_path, wavs[0], model.autoencoder.sampling_rate)

    # S3 업로드
    with open(output_path, "rb") as f:
        s3_key = f"tts_outputs/{uuid.uuid4()}.wav"
        s3_url = upload_file_to_s3(f, s3_key, "audio/wav")

    # DB INSERT
    await session.execute(
        insert(page_audios).values(
            book_id=book_id,
            page_number=page_number,
            voice_id=voice_id,
            audio_url=s3_url,
            voice_url=None,
            created_at=datetime.now(timezone.utc),
            updated_at=datetime.now(timezone.utc)
        )
    )
    os.remove(output_path)