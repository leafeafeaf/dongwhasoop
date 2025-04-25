import { useNavigate } from "react-router-dom";
import mainpage from "../assets/images/mainpage/mainpage.webp";
import cat from "../assets/images/settingpage/cat.webp";  
import dog from "../assets/images/settingpage/dog.webp";
import chik from "../assets/images/settingpage/chik.webp";  

function Profile() {
  const navigate = useNavigate();

  return (
    <div className="font-bazzi fixed inset-0 w-screen h-screen bg-cover bg-center" style={{ backgroundImage: `url(${mainpage})` }}>
      
      <h1 className="xl:text-8xl tablet2560:text-[7vw] text-outline-sm text-center xl:mt-12 tablet2560:mt-28">어떤 친구가 오늘의 주인공이 될까요?</h1>
      
      <div className="flex justify-center items-center gap-40 xl:text-7xl tablet2560:text-[5vw] xl:mt-40 tablet2560:mt-[10vw]">
        <button onClick={() => navigate("/home")} className="hover:scale-110 transition-transform">
          <img src={cat} alt="정해인" className="w-[30vh] h-[30vh] rounded-full bg-[#90EE90]" />
          <p className=" mt-4 text-outline-sm">정해인</p>
        </button>
        <button onClick={() => navigate("/home")} className="hover:scale-110 transition-transform">
          <img src={dog} alt="최우식" className="w-[30vh] h-[30vh]  rounded-full bg-[#87CEEB]" />
          <p className=" mt-4 text-outline-sm">최우식</p>
        </button>
        <button onClick={() => navigate("/home")} className="hover:scale-110 transition-transform">
          <img src={chik} alt="편민준" className="w-[30vh] h-[30vh]  rounded-full bg-[#FFB6C1]" />
          <p className=" mt-4 text-outline-sm">편민준</p>
        </button>
      </div>

    </div>
  );
}

export default Profile;
