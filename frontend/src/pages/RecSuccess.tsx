import { useNavigate } from "react-router-dom";
import mainpage from "../assets/images/mainpage/mainpage.webp";

function RecSuccess() {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 w-screen h-screen bg-cover bg-center" style={{ backgroundImage: `url(${mainpage})` }}>
      <h1>녹음이 완료되었어요.</h1>
      <button onClick={() => navigate("/settings")}>넘어가기</button>
    </div>
  );
}

export default RecSuccess;
