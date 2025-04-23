import { useNavigate } from "react-router-dom";

import mainpage from "../assets/images/mainpage/mainpage.webp";
import BackButton from "../components/commons/BackButton";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 w-screen h-screen bg-cover bg-center" style={{ backgroundImage: `url(${mainpage})` }}>
      <BackButton to="/profile"></BackButton>
      <h1>이 곳은 홈 화면입니다.</h1>
      <button onClick={() => navigate("/settings")}>설정</button>
      <button onClick={() => navigate("/booklist")}>동화</button>
      <button onClick={() => navigate("/maillist")}>우편함</button>
    </div>
  );
}

export default Home;
