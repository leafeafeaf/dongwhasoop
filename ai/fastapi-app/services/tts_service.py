# services/tts_service.py
import torch
from TTS.api import TTS
from TTS.tts.configs.xtts_config import XttsConfig, XttsAudioConfig
from TTS.config.shared_configs import BaseDatasetConfig
from TTS.tts.models.xtts import XttsArgs
import tempfile
import uuid
from services.s3_utils import upload_file_to_s3, load_file_from_s3
import os

torch.serialization.add_safe_globals([
    XttsConfig,
    XttsAudioConfig,
    BaseDatasetConfig,
    XttsArgs
])

device = "cuda" if torch.cuda.is_available() else "cpu"
print(device + "로 실행 중")

# XTTS 모델은 모듈 로딩 시 한 번만 초기화
tts_model = TTS(model_name="tts_models/multilingual/multi-dataset/xtts_v2", gpu=True).to(device)

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
