# services/tts_service.py
import torch
from TTS.api import TTS
from TTS.tts.configs.xtts_config import XttsConfig, XttsAudioConfig
from TTS.config.shared_configs import BaseDatasetConfig
from TTS.tts.models.xtts import XttsArgs
import tempfile
import uuid
from services.s3_utils import upload_file_to_s3, load_file_from_s3
from datetime import datetime,timezone
import asyncio # 병렬 실행
import os
from db.db import database
from db.models import story_pages, user_voices, page_audios
from sqlalchemy import select, and_, outerjoin, null
from kafka.producer import send_result_message

torch.serialization.add_safe_globals([
    XttsConfig,
    XttsAudioConfig,
    BaseDatasetConfig,
    XttsArgs
])

device = "cuda" if torch.cuda.is_available() else "cpu"
print(device + "로 실행 중")

# XTTS 모델은 모듈 로딩 시 한 번만 초기화
tts_model = TTS(model_name="tts_models/multilingual/multi-dataset/xtts_v2").to(device)

def generate_tts_and_upload(text: str, speaker_wav_key: str, language: str = "ko") -> str:
  # 📥 S3에서 wav 다운로드
  with tempfile.NamedTemporaryFile(delete=False, suffix=".wav") as temp_speaker:
    temp_speaker.write(load_file_from_s3(speaker_wav_key))
    speaker_path = temp_speaker.name

    # 생성될 output 파일 경로
    output_path = f"/tmp/{uuid.uuid4()}.wav"
    os.makedirs("/tmp", exist_ok=True)

    try:
      # 음성 생성
      tts_model.tts_to_file(
          text=text,
          speaker_wav=speaker_path,
          language=language,
          file_path=output_path
      )

      # S3 업로드
      with open(output_path, "rb") as f:
        s3_key = f"tts_outputs/{uuid.uuid4()}.wav"
        s3_url = upload_file_to_s3(f, s3_key, "audio/wav")

    finally:
      print("주석 지우기")
      # 파일 삭제
      # if os.path.exists(speaker_path):
      #   os.remove(speaker_path)
      # if os.path.exists(output_path):
      #   os.remove(output_path)

    return s3_url

async def generate_tts_batch_and_upload(book_id: int, voice_id: int, user_id: int):
    # tmp 디렉토리 1회만 생성
    os.makedirs("/tmp", exist_ok=True)

    # 유저 보이스 URL 불러오기
    query = user_voices.select().where(user_voices.c.voice_id == voice_id)
    voice = await database.fetch_one(query)
    if not voice:
      raise ValueError(f"❌ No voice found for voice_id={voice_id}")

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
                page_audios.c.audio_id.is_(null())
            )
        )
      )

      pages = await database.fetch_all(pages_query)

      tasks = [
        _generate_and_save_audio(book_id, voice_id, speaker_path,
                                 page["text_content"], page["page_number"])
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
          "audio_urls": results  # S3 URL 리스트
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


async def _generate_and_save_audio(book_id, voice_id, speaker_path, text,
    page_number):

  # 반환 위치
  output_path = f"/tmp/{uuid.uuid4()}.wav"

  try:
    # TTS 기반 음성 생성
    tts_model.tts_to_file(
        text=text,
        speaker_wav=speaker_path,
        language="ko",
        file_path=output_path
    )
    # S3에 음성 저장
    with open(output_path, "rb") as f:
      s3_key = f"tts_outputs/{uuid.uuid4()}.wav"
      s3_url = upload_file_to_s3(f, s3_key, "audio/wav")

    query = page_audios.insert().values(
        book_id=book_id,
        page_number=page_number,
        voice_id=voice_id,
        audio_url=s3_url,
        voice_url=speaker_path,
        created_at=datetime.now(timezone.utc),
        updated_at=datetime.now(timezone.utc)
    )
    await database.execute(query)
    return s3_url

  except Exception as e:
    print(f"❌ Error on page {page_number}: {e}")
    raise

  finally:
    if os.path.exists(output_path):
      os.remove(output_path)
