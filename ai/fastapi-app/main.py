# 가상 환경 생성 python -m venv .venv
# 가상 환경 활성화 .venv\Scripts\activate.bat
# 서버 실행 uvicorn main:app --reload

print("🟢 이 main.py가 실행되고 있음!")

from fastapi import FastAPI
from aiokafka import AIOKafkaProducer,AIOKafkaConsumer
from contextlib import asynccontextmanager
from config import KAFKA_BOOTSTRAP_SERVERS, KAFKA_TOPIC
import asyncio

producer: AIOKafkaProducer
consumer_task: asyncio.Task

# @asynccontextmanager를 활용한 lifespan 함수는 FastAPI 앱의 생명 주기(Lifecycle)를 관리
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Kafka 생산자 인스턴스(전역변수global)
    global producer, consumer_task
    producer = AIOKafkaProducer(bootstrap_servers=KAFKA_BOOTSTRAP_SERVERS)

    #비동기로 Kafka와 연동
    await producer.start()
    print("✅ Kafka producer started")

    consumer_task = asyncio.create_task(consume_messages())

    try:
        yield
    except Exception as e:
        print(f"❌ lifespan 중 에러 발생: {e}")
        yield

    finally:
        if producer and not producer._closed:
            await producer.stop()
            print("🛑 Kafka producer stopped")

        if consumer_task:
            consumer_task.cancel()
            try:
                await consumer_task
            except asyncio.CancelledError:
                print("🛑 Kafka consumer task cancelled")

async def consume_messages():
    consumer = AIOKafkaConsumer(
        KAFKA_TOPIC,
        bootstrap_servers=KAFKA_BOOTSTRAP_SERVERS,
        group_id="fastapi-group",
    )
    await consumer.start()

    print("✅ Kafka consumer started")
    try:
        async for msg in consumer:
            print(f"💬 Consumed: {msg.value.decode('utf-8')}")
            # 여기에 비즈니스 로직을 넣자!!!!
    finally:
        await consumer.stop()
        print("🛑 Kafka consumer stopped")

app = FastAPI(lifespan=lifespan)

@app.get("/")
def read_root():
    return {"message": "Hello, FastAPI!"}

@app.post("/send")
async def send_message(message: str):
    print(message)
    await producer.send_and_wait(KAFKA_TOPIC, message.encode("utf-8"))
    return {"status": "sent", "message": message}