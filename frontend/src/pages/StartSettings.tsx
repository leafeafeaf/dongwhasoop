import { useNavigate } from "react-router-dom";
import mainpage from "../assets/images/mainpage/mainpage.webp";
import BackButton from "../components/commons/BackButton";

function StartSettings() {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 w-screen h-screen bg-cover bg-center" style={{ backgroundImage: `url(${mainpage})` }}>
      <BackButton></BackButton>
      <h1>최초 정보 등록</h1>
      <h3>부모의 목소리와 아이의 사진, 이름을 등록해주세요.</h3>
      <button>목소리 녹음</button>
      <button>아이의 사진</button>
      <input type="text" value={"아이 이름:"} />
      <button onClick={() => navigate("/home")}>나중에 하기</button>
    </div>
  );
}

export default StartSettings;
