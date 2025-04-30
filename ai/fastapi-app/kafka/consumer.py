from aiokafka import AIOKafkaConsumer
from config import KAFKA_BOOTSTRAP_SERVERS, KAFKA_TOPIC, KAFKA_GROUP_ID

async def consume_messages():
    consumer = AIOKafkaConsumer(
        KAFKA_TOPIC,
        bootstrap_servers=KAFKA_BOOTSTRAP_SERVERS,
        group_id=KAFKA_GROUP_ID,
    )

    await consumer.start()
    print("✅ Kafka consumer started")

    try:
        async for msg in consumer:
            print(f"Consumed: {msg.value.decode('utf-8')}")
            # 비즈니스 로직 자리
    finally:
        await consumer.stop()
        print("🛑 Kafka consumer stopped")