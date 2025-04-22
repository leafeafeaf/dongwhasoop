import { useNavigate } from "react-router-dom";

function Settings() {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate("/home")}>뒤로 가기</button>
      <button>목소리 녹음</button>
      <button>자녀 추가 / 수정</button>
    </div>
  );
}

export default Settings;
