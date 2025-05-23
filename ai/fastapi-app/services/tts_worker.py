# service/tts_worker.py
import torch, torchaudio, uuid, os, tempfile, json
from zonos.model import Zonos
from zonos.conditioning import make_cond_dict
emotion = {
    1: [0.6, 0.05, 0.05, 0.05, 0.1, 0.05, 0.05, 0.05],
    2: [0.05, 0.6, 0.1, 0.1, 0.05, 0.05, 0.025, 0.025],
    3: [0.05, 0.1, 0.6, 0.05, 0.05, 0.05, 0.05, 0.05],
    4: [0.05, 0.1, 0.05, 0.6, 0.1, 0.05, 0.025, 0.025],
    5: [0.1, 0.05, 0.05, 0.1, 0.6, 0.05, 0.025, 0.025],
    6: [0.05, 0.05, 0.05, 0.05, 0.05, 0.7, 0.025, 0.025],
    7: [0.05, 0.05, 0.05, 0.05, 0.1, 0.05, 0.6, 0.05],
    8: [0.1, 0.1, 0.05, 0.1, 0.1, 0.1, 0.15, 0.3],
}

device = "cuda" if torch.cuda.is_available() else "cpu"
def run_worker_loop(queue, worker_id):
    model = Zonos.from_pretrained("Zyphra/Zonos-v0.1-transformer", device=device)
    print(f"🎤 TTS 워커 {worker_id} 시작")

    while True:

        task = queue.get()
        if task == "STOP":
            print("👋 워커 종료됨")
            break
            
        try:
            speaker_path = task["speaker_path"]
            text = task["text"]
            emotion_type = task.get("emotion_type", 8)
            output_path = task["output_path"]

            print(f"{worker_id}워커 음성 생성 시작 : 경로 :{speaker_path} / 텍스트 : {text}")

            wav, sr = torchaudio.load(speaker_path)
            print(f"{worker_id}워커 wav 및 sr 불러오기 성공")
            
            speaker = model.make_speaker_embedding(wav, sr)
            print(f"{worker_id}워커 보이스 클로닝 성공")

            cond = make_cond_dict(text=text, speaker=speaker, language="ko", emotion=emotion[emotion_type])
            print(f"{worker_id}워커 스타일 지정")
            conditioning = model.prepare_conditioning(cond)
            
            codes = model.generate(conditioning)
            print(f"{worker_id}워커 음성 생성")
            wavs = model.autoencoder.decode(codes).cpu()
            torchaudio.save(output_path, wavs[0], model.autoencoder.sampling_rate)

        except Exception as e:
            print(f"❌{worker_id} 워커 처리 실패: {e}")
            if "output_path" in task and os.path.exists(task["output_path"]):
                try:
                    os.remove(task["output_path"])
                    print(f"🧹 실패한 파일 삭제: {task['output_path']}")
                except Exception as delete_err:
                    print(f"⚠️ 파일 삭제 실패: {delete_err}")