import { useNavigate } from "react-router-dom";

import mainpage from "../assets/images/mainpage/mainpage.webp";
import LetterBird from "../assets/images/writeletter/letterbird.png";

function SendLetter() {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 w-screen h-screen bg-cover bg-center" style={{ backgroundImage: `url(${mainpage})` }}>
      {/* 새 이미지 */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <img
          src={LetterBird}
          alt="새 이미지"
          className="w-[80vw] max-w-[1000px] h-auto object-contain drop-shadow-2xl animate-triple-bounce"
        />
      </div>
      <button onClick={() => navigate("/home")}>홈으로 돌아가기</button>
    </div>
  );
}

export default SendLetter;
