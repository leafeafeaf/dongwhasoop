import { useNavigate } from "react-router-dom";

function SongEnd() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>신나게 노래 들었어요!</h1>
      <button onClick={() => navigate("/home")}>홈</button>
      <button>다시 듣기</button>
      <button>동화 보기</button>
    </div>
  );
}

export default SongEnd;
