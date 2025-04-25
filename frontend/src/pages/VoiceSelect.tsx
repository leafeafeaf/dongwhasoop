import { useNavigate } from "react-router-dom";

import mainpage from "../assets/images/mainpage/mainpage.webp";
import BackButton from "../components/commons/BackButton";
import RightButton from "../assets/buttons/rightbutton.webp";
import RecAlert from "../assets/images/settingpage/recalert.webp";
import Mother from "../assets/images/settingpage/mother.webp";
import Father from "../assets/images/settingpage/father.webp";

function StartSettings() {
  const navigate = useNavigate();

  return (
    <div
      className="fixed inset-0 w-screen h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${mainpage})` }}
    >
      <BackButton to="/startsettings" />

    <div>
      <div className="flex justify-center items-center gap-20 mt-20 mb-12">
        <button className="hover:scale-105 transition-transform">
          <img 
            src={Mother} 
            alt="엄마" 
            className="
              xl:w-[25vw] xl:max-w-[500px]
              tablet2560:w-[30vw] tablet2560:max-w-[800px]
              h-auto
            " 
          />
        </button>
        <button className="hover:scale-105 transition-transform">
          <img 
            src={Father} 
            alt="아빠" 
            className="
              xl:w-[25vw] xl:max-w-[500px]
              tablet2560:w-[30vw] tablet2560:max-w-[800px]
              h-auto
            " 
          />
        </button>
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 flex items-center w-[95vw] max-w-[1800px] lg:w-[60vw] md:mt-[3vw]">
        <img src={RecAlert} alt="경고안내문" className="w-full h-auto" />
        <h1 className="absolute text-[6vh] font-bazzi text-outline-xs text-center mb-[20vh]">
          녹음하는 사람은 누구인가요?
        </h1>
      </div>
    </div>

      {/* 다음 버튼 */}
      <div className="absolute w-[15vw] max-w-[300px] right-0 mr-[10vh] top-[40vh]">
        <button onClick={() => navigate("/recinfo")}>
          <img src={RightButton} alt="넘어가기" />
        </button>
      </div>
    </div>
  );
}

export default StartSettings;
