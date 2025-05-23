# kafka/producer_sync.py
from kafka import KafkaProducer
import json
from config import KAFKA_BOOTSTRAP_SERVERS, KAFKA_RESULT_TOPIC

# 동기 Kafka 프로듀서 생성
producer = KafkaProducer(
    bootstrap_servers=KAFKA_BOOTSTRAP_SERVERS,
    value_serializer=lambda v: json.dumps(v).encode("utf-8")
)

# 동기 메시지 전송
def send_result_message(message: dict):
    print("📤 Kafka 메시지 전송 중...")
    producer.send(KAFKA_RESULT_TOPIC, value=message)
    producer.flush()
    print("✅ Kafka 메시지 전송 완료")
