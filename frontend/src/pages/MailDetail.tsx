import { useNavigate } from "react-router-dom";

import mainpage from "../assets/images/mainpage/mainpage.webp";

function MailDetail() {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 w-screen h-screen bg-cover bg-center" style={{ backgroundImage: `url(${mainpage})` }}>
      <button onClick={() => navigate(-1)}>뒤로 가기</button>
      <h1>이 곳은 메일 상세 페이지입니다.</h1>
    </div>
  );
}

export default MailDetail;
