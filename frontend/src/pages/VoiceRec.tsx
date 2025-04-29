import { useNavigate } from "react-router-dom";
import mainpage from "../assets/images/mainpage/mainpage.webp";
import BackButton from "../components/commons/BackButton";
import ReadChild from "../assets/images/settingpage/readchild.webp";
import SittingChild from "../assets/images/settingpage/sittingchild.webp";
import SubmitRec from "../assets/images/settingpage/submitrec.webp";
import RecStory from "../assets/images/settingpage/recstory.webp";
import RightButton from "../assets/buttons/rightbutton.webp";
import LeftButton from "../assets/buttons/leftbutton.webp";

function VoiceRec() {
  const navigate = useNavigate();

  return (
    <div
      className="fixed inset-0 w-screen h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${mainpage})` }}
    >
      <BackButton/>

      <div className="xl:pt-[1vw] tablet2560:pt-[4vw]">
        {/* Title */}
        <h1 className="text-[6vh] font-bazzi text-center text-outline-ss mt-8">
          아래 대본을 모두 읽어주세요
        </h1>

        <div className="relative flex items-center justify-center mt-8">
          <button className="hover:scale-105 transition-transform">
            <img src={LeftButton} alt="이전" className="w-[8vw]" />
          </button>

          <div className="w-[65vw] h-[40vh] bg-white/80 rounded-3xl mx-8">
            {/* Script content will go here */}
          </div>

          <button className="hover:scale-105 transition-transform">
            <img src={RightButton} alt="다음" className="w-[8vw]" />
          </button>
        </div>

        {/* Recording Controls */}
        <div className="flex justify-center items-center gap-10 mt-[2vw] relative z-10">
          <button className="hover:scale-105 transition-transform">
            <img src={RecStory} alt="녹음하기" className="w-[18vw]" />
          </button>
          <button
            className="hover:scale-105 transition-transform"
            onClick={() => navigate("/recsuccess")}
          >
            <img src={SubmitRec} alt="등록하기" className="w-[18vw]" />
          </button>
        </div>
      </div>
      {/* Children Images */}
      <div className="absolute bottom-4 w-full flex justify-between items-end px-[5vw] z-[5]">
        <img
          src={SittingChild}
          alt="앉아있는아이"
          className="w-[15vw]"
        />
        <img
          src={ReadChild}
          alt="읽고있는아이"
          className="w-[17vw]"
        />
      </div>
    </div>
  );
}

export default VoiceRec;
