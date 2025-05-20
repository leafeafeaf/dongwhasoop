# services/global_task_queue.py
from multiprocessing import Queue

# 모든 모듈이 공유할 큐 
task_queue: Queue = None
worker_processes = []  # 워커 프로세스 리스트

def init_task_queue():
    global task_queue
    task_queue = Queue()
    return task_queue

def get_task_queue():
    return task_queue