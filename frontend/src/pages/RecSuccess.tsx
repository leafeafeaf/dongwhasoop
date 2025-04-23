import { useNavigate } from "react-router-dom";
import mainpage from "../assets/images/mainpage/mainpage.webp";
import BackButton from "../components/commons/BackButton";

function RecSuccess() {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 w-screen h-screen bg-cover bg-center" style={{ backgroundImage: `url(${mainpage})` }}>
      <BackButton></BackButton>
      <h1>녹음 주의사항</h1>
      <button onClick={() => navigate("/settings")}>넘어가기</button>
    </div>
  );
}

export default RecSuccess;
