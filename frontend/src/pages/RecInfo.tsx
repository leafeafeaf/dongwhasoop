import { useNavigate } from "react-router-dom";

function RecInfo() {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate("/home")}>뒤로 가기</button>
      <h1>녹음 주의사항</h1>
      <button onClick={() => navigate("/voicerec")}>넘어가기</button>
    </div>
  );
}

export default RecInfo;
