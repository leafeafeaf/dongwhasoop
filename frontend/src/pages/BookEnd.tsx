import { useNavigate } from "react-router-dom";

import endpagebackground from "../assets/images/endpage/endpagebackground.webp";

function BookEnd() {
  const navigate = useNavigate();

  return (
    <div
      className="fixed inset-0 w-screen h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${endpagebackground})` }}
    >
      <h1>다음 이야기에서도 함께 해요!</h1>
      <button onClick={() => navigate("/home")}>홈</button>
      <button onClick={() => navigate("/sendwho")}>편지 쓰기</button>
      <button>동요 듣기</button>
    </div>
  );
}

export default BookEnd;
