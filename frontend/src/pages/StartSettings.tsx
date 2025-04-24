import { useNavigate } from "react-router-dom";
import mainpage from "../assets/images/mainpage/mainpage.webp";

import AddChild from "../assets/images/settingpage/addchild.webp";
import VoiceRecIcon from "../assets/images/settingpage/voicerec.webp";
import NextTime from "../assets/images/settingpage/nexttime.webp";

function StartSettings() {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 w-screen h-screen bg-cover bg-center" style={{ backgroundImage: `url(${mainpage})` }}>
      <h1 className="text-[10vh] font-bazzi text-black-600 text-center text-outline-sm">
        부모님의 목소리와 자녀 정보를 등록해주세요.
      </h1>

      {/* 목소리 녹음, 자녀추가 */}
      <div>
        <button onClick={() => navigate("/recinfo")}>
          <img src={VoiceRecIcon} alt="목소리 녹음" />
        </button>
        <button onClick={() => navigate("/kidsettings")}>
          <img src={AddChild} alt="자녀추가" />
        </button>
      </div>

      {/* 나중에하기 */}
      <button onClick={() => navigate("/home")}>
        <img src={NextTime} alt="나중에하기" />
      </button>
    </div>
  );
}

export default StartSettings;
