import { useNavigate } from "react-router-dom";

function BookEnd() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>다음 이야기에서도 함께 해요!</h1>
      <button onClick={() => navigate("/home")}>홈</button>
      <button onClick={() => navigate("/sendwho")}>편지 쓰기</button>
      <button>동요 듣기</button>
    </div>
  );
}

export default BookEnd;
