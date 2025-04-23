import { useNavigate } from "react-router-dom";

import mainpage from "../assets/images/mainpage/mainpage.webp";

function MailList() {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 w-screen h-screen bg-cover bg-center" style={{ backgroundImage: `url(${mainpage})` }}>
      <button onClick={() => navigate(-1)}></button>
      <h1>이 곳은 북 리스트 페이지입니다.</h1>
    </div>
  );
}

export default MailList;
