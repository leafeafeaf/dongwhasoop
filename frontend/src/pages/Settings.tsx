// import { useNavigate } from "react-router-dom";

import mainpage from "../assets/images/mainpage/mainpage.webp";
import BackButton from "../components/commons/BackButton";

function Settings() {
  // const navigate = useNavigate();

  return (
    <div className="fixed inset-0 w-screen h-screen bg-cover bg-center" style={{ backgroundImage: `url(${mainpage})` }}>
      <BackButton></BackButton>
      <button>목소리 녹음</button>
      <button>자녀 추가 / 수정</button>
    </div>
  );
}

export default Settings;
