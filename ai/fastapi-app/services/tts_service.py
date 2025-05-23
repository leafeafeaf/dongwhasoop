# # services/tts_service.py
import torchaudio
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
from sqlalchemy.ext.asyncio import AsyncSession

from db.models import story_pages, user_voices, page_audios
from sqlalchemy import select, and_, outerjoin, null, insert
from kafka.producer import send_result_message
from services.global_task_queue import get_task_queue

# # Index: [행복, 슬픔, 역겨움, 공포, 놀람, 분노, 기타1, 기타2]
# emotion = {
#     1: [0.6, 0.05, 0.05, 0.05, 0.1, 0.05, 0.05, 0.05],  # 행복
#     2: [0.05, 0.6, 0.1, 0.1, 0.05, 0.05, 0.025, 0.025],  # 슬픔
#     3: [0.05, 0.1, 0.6, 0.05, 0.05, 0.05, 0.05, 0.05],  # 역겨움
#     4: [0.05, 0.1, 0.05, 0.6, 0.1, 0.05, 0.025, 0.025],  # 공포
#     5: [0.1, 0.05, 0.05, 0.1, 0.6, 0.05, 0.025, 0.025],  # 놀람
#     6: [0.05, 0.05, 0.05, 0.05, 0.05, 0.7, 0.025, 0.025],  # 분노
#     7: [0.05, 0.05, 0.05, 0.05, 0.1, 0.05, 0.6, 0.05],    # 기타1 (몽환, 평온 등)
#     8: [0.1, 0.1, 0.05, 0.1, 0.1, 0.1, 0.15, 0.3],        # 기본(중립)
# }


async def generate_tts_batch_and_upload(session: AsyncSession, book_id: int, voice_id: int, user_id: int):
    # tmp 디렉토리 1회만 생성
    os.makedirs("/tmp", exist_ok=True)

    # 유저 보이스 URL 불러오기
    query = select(user_voices).where(user_voices.c.voice_id == voice_id)
    result = await session.execute(query)
    voice = result.mappings().one_or_none()

    if not voice:
      raise ValueError(f"❌ No voice found for voice_id={voice_id}")

    print(f"voice 객체 타입은 : {type(voice)}")
    speaker_wav_key = voice["voice_url"]

    # S3에서 사용자 음성 1회 다운로드
    with tempfile.NamedTemporaryFile(delete=False, suffix=".wav", dir="/tmp") as temp_speaker:
      temp_speaker.write(load_file_from_s3(speaker_wav_key))
      speaker_path = temp_speaker.name

    try:
      # 조인 쿼리: 아직 음성이 없는 페이지만 가져오기
      pages_query = (
        select(story_pages)
        .select_from(
            outerjoin(
                story_pages,
                page_audios,
                and_(
                    story_pages.c.book_id == page_audios.c.book_id,
                    story_pages.c.page_number == page_audios.c.page_number,
                    page_audios.c.voice_id == voice_id
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

      result = await session.execute(pages_query)
      pages = result.mappings().all()  # 딕셔너리 형태로 반환 (text_content 접근 가능)
    
      tasks = [
        _generate_and_save_audio(session, book_id, voice_id, speaker_path,
                                 page["text_content"], page["page_number"],page["emotion_type"] )
        for page in pages
      ]
      results = await asyncio.gather(*tasks)
      print(f"✅ Generated and uploaded {len(results)} TTS files")

      await send_result_message({
        "type": "TTS_COMPLETE",
        "payload": {
          "book_id": book_id,
          "voice_id": voice_id,
          "user_id": user_id,
        }
      })
    except Exception as e:
      print(f"❌ TTS 작업 중 오류 발생: {e}")
      await send_result_message({
        "type": "TTS_FAILED",
        "payload": {
          "book_id": book_id,
          "voice_id": voice_id,
          "user_id": user_id,
          "error": str(e)
        }
      })
    finally:
      if os.path.exists(speaker_path):
        os.remove(speaker_path)


async def _generate_and_save_audio(
    session: AsyncSession,
    book_id: int,
    voice_id: int,
    speaker_path: str,
    text: str,
    page_number: int,
    emotion_type : int = 8
):

  if not (1 <= emotion_type <= 8):
    emotion_type = 8
  

  # 1. 워커에 전달할 작업 생성
  task = {
      "text": text,
      "emotion_type": emotion_type,
      "speaker_path": speaker_path,
      "output_path": f"/tmp/{uuid.uuid4()}.wav"
  }
  queue = get_task_queue()

  print("태스크 작업 큐에 삽입")
  queue.put(task)

  # 2. 워커가 output_path에 파일 생성 완료할 때까지 대기 (예: 파일 존재 여부 확인 or result_queue)
  MAX_WAIT_SECONDS = 1800  # 최대 30분 대기

  start_time = time.time()
  while not os.path.exists(task["output_path"]):
      await asyncio.sleep(0.1)  # 간단한 polling 방식
      if time.time() - start_time > MAX_WAIT_SECONDS:
        raise TimeoutError(f"TTS 결과 파일이 {MAX_WAIT_SECONDS}초 안에 생성되지 않았습니다.")

  print("tts-service한테 주도권 넘어옴")

  try:
    # S3에 음성 저장
    with open(task["output_path"], "rb") as f:
      s3_key = f"tts_outputs/{uuid.uuid4()}.wav"
      s3_url = upload_file_to_s3(f, s3_key, "audio/wav")

    print(f"s3 업로드 : {s3_url}")

    query = insert(page_audios).values(
        book_id=book_id,
        page_number=page_number,
        voice_id=voice_id,
        audio_url=s3_url,
        voice_url=None,
        created_at=datetime.now(timezone.utc),
        updated_at=datetime.now(timezone.utc)
    )
    await session.execute(query)

    return s3_url

  except Exception as e:
    print(f"❌ Error on page {page_number}: {e}")
    raise

  finally:
    if os.path.exists(task["output_path"]):
      os.remove(task["output_path"])
