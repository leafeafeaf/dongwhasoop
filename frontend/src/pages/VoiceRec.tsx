import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

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
  const location = useLocation();

  // 녹음중인지 아닌지 (프론트 확인용) 추후 수정 필요!
  const [isRecording, setIsRecording] = useState(false);
  const gender = location.state?.gender || null;

  const handleRecord = () => {
    setIsRecording(true);
    console.log("녹음 시작 (확인용)");

    setTimeout(() => {
      setIsRecording(false);
      console.log("녹음 완료");
    }, 3000);
  };

  const handleSubmit = () => {
    console.log("녹음 등록 완료!");
    console.log("선택한 목소리:", gender);

    navigate("/recsuccess");
  };

  return (
    <div className="fixed inset-0 w-screen h-screen bg-cover bg-center" style={{ backgroundImage: `url(${mainpage})` }}>
      <BackButton />

      <div className="xl:pt-[1vw] tablet2560:pt-[4vw]">
        {/* Title */}
        <h1 className="text-[6vh] font-bazzi text-center text-outline-ss mt-8">아래 대본을 모두 읽어주세요</h1>

        <div className="relative flex items-center justify-center mt-8">
          <button className="hover:scale-105 transition-transform">
            <img src={LeftButton} alt="이전" className="w-[8vw]" />
          </button>

          <div className="w-[65vw] h-[40vh] bg-white/80 rounded-3xl mx-8">{/* Script content will go here */}</div>

          <button className="hover:scale-105 transition-transform">
            <img src={RightButton} alt="다음" className="w-[8vw]" />
          </button>
        </div>

        {/* 녹음 버튼들*/}
        <div className="flex justify-center items-center gap-10 mt-[2vw] relative z-10">
          <button className="hover:scale-105 transition-transform" onClick={handleRecord} disabled={isRecording}>
            <img src={RecStory} alt="녹음하기" className={`w-[18vw] ${isRecording ? "opacity-50" : ""}`} />
          </button>

          <button className="hover:scale-105 transition-transform" onClick={handleSubmit} disabled={isRecording}>
            <img src={SubmitRec} alt="등록하기" className="w-[18vw]" />
          </button>
        </div>
      </div>

      {/* 아이들 배경 이미지 */}
      <div className="absolute bottom-4 w-full flex justify-between items-end px-[5vw] z-[5]">
        <img src={SittingChild} alt="앉아있는아이" className="w-[15vw]" />
        <img src={ReadChild} alt="읽고있는아이" className="w-[17vw]" />
      </div>
    </div>
  );
}

export default VoiceRec;
