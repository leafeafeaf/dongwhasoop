import { useNavigate } from "react-router-dom";
import mainpage from "../assets/images/mainpage/mainpage.webp";

function VoiceRec() {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 w-screen h-screen bg-cover bg-center" style={{ backgroundImage: `url(${mainpage})` }}>
      <button onClick={() => navigate(-1)}>뒤로 가기</button>
      <h1>이 곳은 목소리 녹음하는 곳입니다.</h1>
      <button>녹음하기</button>
      <button>재생하기</button>
      <button onClick={() => navigate("/recsuccess")}>등록</button>
    </div>
  );
}

export default VoiceRec;
