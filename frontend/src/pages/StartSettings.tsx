import { useNavigate } from "react-router-dom";
import mainpage from "../assets/images/mainpage/mainpage.webp";

import AddChild from "../assets/images/settingpage/addchild.webp";
import VoiceRecIcon from "../assets/images/settingpage/voicerec.webp";
import Next from "../assets/images/settingpage/next.webp";

function StartSettings() {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 w-screen h-screen bg-cover bg-center" style={{ backgroundImage: `url(${mainpage})` }}>
      <h1 className="text-[10vh] font-bazzi text-black-600 text-center text-outline-sm mt-[5vw] tablet2560:mt-[4vw]">
        부모님의 목소리와 자녀 정보를 등록해주세요.
      </h1>

      {/* 목소리 녹음, 자녀추가 */}
      <div className="flex justify-center items-center gap-20 mt-20">
        <button onClick={() => navigate("/voiceselect")} className="hover:scale-110 transition-transform">
          <img src={VoiceRecIcon} alt="목소리 녹음" className="w-[25vw] tablet2560:w-[30vw]" />
        </button>
        <button onClick={() => navigate("/kidsettings")} className="hover:scale-110 transition-transform">
          <img src={AddChild} alt="자녀추가" className="w-[25vw] tablet2560:w-[30vw]" />
        </button>
      </div>

      {/* 등록하기 */}
      <div className="fixed bottom-0 right-0 mb-4 mx-8">
        <button onClick={() => navigate("/home")}>
          <img src={Next} alt="등록하기" className="xl:w-[15vw]" />
        </button>
      </div>
    </div>
  );
}

export default StartSettings;
