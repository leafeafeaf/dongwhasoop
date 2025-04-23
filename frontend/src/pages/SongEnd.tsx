import { useNavigate } from "react-router-dom";

import endpagebackground from "../assets/images/endpage/endpagebackground.webp";

function SongEnd() {
  const navigate = useNavigate();

  return (
    <div
      className="fixed inset-0 w-screen h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${endpagebackground})` }}
    >
      <h1>신나게 노래 들었어요!</h1>
      <button onClick={() => navigate("/home")}>홈</button>
      <button>다시 듣기</button>
      <button>동화 보기</button>
    </div>
  );
}

export default SongEnd;
