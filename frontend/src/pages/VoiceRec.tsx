import { useNavigate } from "react-router-dom";

function VoiceRec() {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate(-1)}>뒤로 가기</button>
      <h1>이 곳은 목소리 녹음하는 곳입니다.</h1>
      <button>녹음하기</button>
      <button>재생하기</button>
      <button onClick={() => navigate("/home")}>등록</button>
    </div>
  );
}

export default VoiceRec;
