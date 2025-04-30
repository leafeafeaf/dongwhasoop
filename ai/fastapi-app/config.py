from dotenv import load_dotenv
import os

load_dotenv()  # .env 파일 읽어오기

KAFKA_BOOTSTRAP_SERVERS = os.getenv("KAFKA_BOOTSTRAP_SERVERS")
KAFKA_TOPIC = os.getenv("KAFKA_TOPIC")