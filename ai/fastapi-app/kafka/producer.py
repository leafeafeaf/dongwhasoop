from aiokafka import AIOKafkaProducer
from config import KAFKA_BOOTSTRAP_SERVERS

producer: AIOKafkaProducer = AIOKafkaProducer(bootstrap_servers=KAFKA_BOOTSTRAP_SERVERS)

async def start_producer():
    await producer.start()
    print("✅ Kafka producer started")

async def stop_producer():
    if producer and not producer._closed:
        await producer.stop()
        print("🛑 Kafka producer stopped")

async def send_message(topic: str, message: str):
    await producer.send_and_wait(topic, message.encode("utf-8"))
