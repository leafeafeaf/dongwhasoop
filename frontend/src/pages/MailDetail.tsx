import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import mainpage from "../assets/images/mainpage/mainpage.webp";
import letterpaper from "../assets/images/letterbox/letterpaper1.webp";
import send from "../assets/images/letterbox/sendletter.webp";
import receive from "../assets/images/letterbox/receiveletter.webp";
import princess from "../assets/images/letterbox/princess.webp";
import replay from "../assets/images/letterbox/replay.webp";
import BackButton from "../components/commons/BackButton";

function MailDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'received' | 'sent'>('received');

  // 예시 편지 데이터
  const letterData = {
    to: "효원이에게",
    content: "편지 보내줘서 정말 고마워~\n숲속 작은 오두막에서 일곱 난쟁이들과\n함께 행복하게 지내고 있어\n숲속 오두막으로 놀러 와~",
    date: "2025.04.22",
    from: "백설공주가"
  };

  const handleTabChange = (tab: 'received' | 'sent') => {
    setActiveTab(tab);
  };

  const handleBackButton = () => {
    navigate(-1);
  };

  return (
    <div className="fixed inset-0 w-screen h-screen bg-cover bg-center" style={{ backgroundImage: `url(${mainpage})` }}>
      <BackButton onClick={handleBackButton} />
      
      {/* 상단 탭 버튼 */}
      <div className="absolute top-[10vh] left-1/2 transform -translate-x-1/2 flex gap-24">
        <div 
          className={`cursor-pointer transition-transform ${activeTab === 'sent' ? 'scale-110 drop-shadow-lg' : 'opacity-80 hover:opacity-100'}`}
          onClick={() => handleTabChange('sent')}
        >
          <img src={receive} alt="Sent" className="w-90" />
        </div>
        <div 
          className={`cursor-pointer transition-transform ${activeTab === 'received' ? 'scale-110 drop-shadow-lg' : 'opacity-80 hover:opacity-100'}`}
          onClick={() => handleTabChange('received')}
        >
          <img src={send} alt="Received" className="w-90" />
        </div>
      </div>

      <div className="flex justify-between items-center tablet2560:px-60 xl:px-40 h-full xl:mt-24 tablet2560:mt-40">
        {/* 편지 내용 */}
        <div className="relative w-[60vw] xl:w-[50vw]">
          <img src={letterpaper} alt="Letter Paper" className="w-full" />
          
          <div className="tablet2560:text-6xl xl:text-3xl xl:mt-5 font-maplestory tablet2560:mt-10 absolute top-[10%] left-[8%] right-[8%] bottom-[10%] flex flex-col">
            {/* 받는 사람 */}
            <div className="tablet2560:mb-16 xl:mb-12">
              {letterData.to}
            </div>
            
            {/* 편지 내용 */}
            <div className="leading-relaxed flex-grow whitespace-pre-line">
              {letterData.content}
            </div>
            
            {/* 날짜와 보낸 사람 */}
            <div className="flex tablet2560:text-6xl xl:text-3xl font-maplestory justify-end items-center gap-8">
              <div>{letterData.date}</div>
              <div className="flex items-center gap-3">
                <span>{letterData.from}</span>
                <img src={princess} alt="Character" className="w-28 h-28" />
              </div>
            </div>
          </div>
        </div>

        {/* 다시 듣기 버튼 */}
        <div className="cursor-pointer transition-transform hover:scale-105">
          <img src={replay} alt="Replay" className="tablet2560:w-[500px] tablet2560:h-[500px] xl:w-[300px] xl:h-[300px]" />
        </div>
      </div>
    </div>
  );
}

export default MailDetail;
