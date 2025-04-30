# 가상 환경 생성 python -m venv .venv
# 가상 환경 활성화 .venv\Scripts\activate.bat
# 서버 실행 uvicorn main:app --reload
from fastapi import FastAPI
from contextlib import asynccontextmanager
import asyncio

from kafka.producer import start_producer, stop_producer, send_message, producer
from kafka.consumer import consume_messages
from config import KAFKA_TOPIC

consumer_task: asyncio.Task # 백그라운드 태스크 (지속적으로 카프카로부터 메시지를 읽어옴)

#FastAPI 앱의 생명 주기(Lifecycle)를 관리
@asynccontextmanager
async def lifespan(app: FastAPI):
    global consumer_task
    await start_producer()
    consumer_task = asyncio.create_task(consume_messages())
    try:
        yield
    finally:
        await stop_producer()
        if consumer_task:
            consumer_task.cancel()
            try:
                await consumer_task
            except asyncio.CancelledError:
                print("🛑 Kafka consumer task cancelled")

app = FastAPI(lifespan=lifespan)

@app.get("/")
def read_root():
    return {"message": "Hello, FastAPI!"}

@app.post("/send")
async def send(message: str):
    await send_message(KAFKA_TOPIC, message)
    return {"status": "sent", "message": message}