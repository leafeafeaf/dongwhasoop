# 가상 환경 생성 python -m venv .venv
# 가상 환경 활성화 .venv\Scripts\activate.bat
# 서버 실행 uvicorn main:app --reload
from fastapi import FastAPI, UploadFile, File
from fastapi.responses import StreamingResponse
import io

from contextlib import asynccontextmanager
import asyncio

from db.db import database
from db.models import letters,page_audios,story_pages,user_voices
from kafka.producer import start_producer, stop_producer, send_message, producer
from kafka.consumer import consume_messages
from config import KAFKA_TOPIC

from services.letters_service import generate_letter
from services.s3_utils import upload_file_to_s3, load_file_from_s3
from services.tts_service import generate_tts_and_upload

consumer_task: asyncio.Task # 백그라운드 태스크 (지속적으로 카프카로부터 메시지를 읽어옴)

#FastAPI 앱의 생명 주기(Lifecycle)를 관리
@asynccontextmanager
async def lifespan(app: FastAPI):
    global consumer_task

    await database.connect()
    await start_producer()
    consumer_task = asyncio.create_task(consume_messages())
    try:
        yield
    finally:
        await database.disconnect()
        await stop_producer()
        if consumer_task:
            consumer_task.cancel()
            try:
                await consumer_task
            except asyncio.CancelledError:
                print("🛑 Kafka consumer task cancelled")

app = FastAPI(lifespan=lifespan)

# 서버 테스트
@app.get("/")
def read_root():
    return {"message": "Hello, FastAPI!"}

# 카프카 produce 테스트
@app.post("/send")
async def send(message: str):
    await send_message(KAFKA_TOPIC, message)
    return {"status": "sent", "message": message}

#DB 연결 테스트
@app.get("/pages")
async def get_all_pages():
    query = story_pages.select()
    return await database.fetch_all(query)

@app.get("/pages/{page_number}")
async def get_page_by_number(page_number: int):
    query = story_pages.select().where(story_pages.c.page_number == page_number)
    result = await database.fetch_all(query)
    return result

#OpenAI 테스트 TODO (추후 kafka로 뺄거임)
@app.post("/letters/generate/{letter_id}")
async def generate_letter_api(letter_id: int):
    try:
        result = await generate_letter(letter_id)
        return {"status": "success", "content": result}
    except ValueError as e:
        return {"status": "error", "message": str(e)}

#S3 테스트
@app.post("/upload")
async def upload(file: UploadFile = File(...)):
    file_url = upload_file_to_s3(
        file_obj=file.file,
        filename=file.filename,
        content_type=file.content_type
    )
    return {"file_url": file_url}


@app.get("/play-audio/{filename}")
def play_audio(filename: str):
    audio_bytes = load_file_from_s3(filename)
    audio_stream = io.BytesIO(audio_bytes)
    return StreamingResponse(audio_stream, media_type="audio/wav")

# TTS 테스트
@app.post("/generate-tts")
async def generate_tts():
    """
    테스트용: XTTS-v2로 고정된 입력값으로 음성을 생성하고 S3 URL을 반환합니다.
    """
    text = "안녕, 나는 너의 친구야!"
    speaker_wav_key = "신난목소리.wav"
    language = "ko"

    tts_url = generate_tts_and_upload(
        text=text,
        speaker_wav_key=speaker_wav_key,
        language=language
    )
    return {"tts_url": tts_url}