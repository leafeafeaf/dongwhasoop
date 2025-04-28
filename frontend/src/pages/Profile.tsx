import { useNavigate } from "react-router-dom";
import mainpage from "../assets/images/mainpage/mainpage.webp";
import cat from "../assets/images/settingpage/cat.webp";
import dog from "../assets/images/settingpage/dog.webp";
import chik from "../assets/images/settingpage/chik.webp";
import settingsbtn from "../assets/images/settingpage/settingsbtn.webp";

function Profile() {
  const navigate = useNavigate();

  return (
    <div className="font-bazzi fixed inset-0 w-screen h-screen bg-cover bg-center" style={{ backgroundImage: `url(${mainpage})` }}>

      {/* 프로필 선택 */}
      <button
        onClick={() => navigate("/settings")}
        className="absolute top-7 right-7 z-10"
      >
        <img src={settingsbtn} alt="설정" className="w-[9vw] max-w-[500px] min-w-[50px]" />
      </button>

      <div className="flex flex-col pt-16">
        <h1 className="pt-[14vh] text-[9vh] sm:text-[11vh] xl:text-[10vh] text-outline-sm text-center">
          어떤 친구가 오늘의 주인공이 될까요?
        </h1>
        <div className="flex justify-center items-center gap-10 sm:gap-20 xl:gap-40 mt-6 sm:mt-12 xl:mt-40">
          <button onClick={() => navigate("/home")} className="hover:scale-110 transition-transform">
            <img src={cat} alt="정해인" className="w-[20vh] h-[20vh] sm:w-[25vh] sm:h-[25vh] xl:w-[30vh] xl:h-[30vh] rounded-full bg-[#90EE90]" />
            <p className="mt-4 text-[5vh] sm:text-[7vh] xl:text-[8vh] text-outline-sm">정해인</p>
          </button>
          <button onClick={() => navigate("/home")} className="hover:scale-110 transition-transform">
            <img src={dog} alt="최우식" className="w-[20vh] h-[20vh] sm:w-[25vh] sm:h-[25vh] xl:w-[30vh] xl:h-[30vh] rounded-full bg-[#87CEEB]" />
            <p className="mt-4 text-[5vh] sm:text-[7vh] xl:text-[8vh] text-outline-sm">최우식</p>
          </button>
          <button onClick={() => navigate("/home")} className="hover:scale-110 transition-transform">
            <img src={chik} alt="편민준" className="w-[20vh] h-[20vh] sm:w-[25vh] sm:h-[25vh] xl:w-[30vh] xl:h-[30vh] rounded-full bg-[#FFB6C1]" />
            <p className="mt-4 text-[5vh] sm:text-[7vh] xl:text-[8vh] text-outline-sm">편민준</p>
          </button>
        </div>
      </div>


    </div>
  );
}

export default Profile;
