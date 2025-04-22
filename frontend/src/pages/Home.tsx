import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>이 곳은 홈 화면입니다.</h1>
      <button onClick={() => navigate("/settings")}>설정</button>
      <button onClick={() => navigate("/booklist")}>동화</button>
      <button onClick={() => navigate("/maillist")}>우편함</button>
    </div>
  );
}

export default Home;
