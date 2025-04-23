import { useNavigate } from "react-router-dom";

import mainpage from "../assets/images/mainpage/mainpage.webp";

function SendLetter() {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 w-screen h-screen bg-cover bg-center" style={{ backgroundImage: `url(${mainpage})` }}>
      <h1>이 곳은 새가 날아가는 곳입니다.</h1>
      <button onClick={() => navigate("/home")}>홈으로 돌아가기</button>
    </div>
  );
}

export default SendLetter;
