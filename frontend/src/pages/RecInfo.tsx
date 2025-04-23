import { useNavigate } from "react-router-dom";
import mainpage from "../assets/images/mainpage/mainpage.webp";

function RecInfo() {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 w-screen h-screen bg-cover bg-center" style={{ backgroundImage: `url(${mainpage})` }}>
      <button onClick={() => navigate("/home")}>뒤로 가기</button>
      <h1>녹음 주의사항</h1>
      <button onClick={() => navigate("/voicerec")}>넘어가기</button>
    </div>
  );
}

export default RecInfo;
