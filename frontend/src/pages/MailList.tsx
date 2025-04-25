import { useState } from "react";
import { useNavigate } from "react-router-dom";
import mainpage from "../assets/images/mainpage/mainpage.webp";
import letterlist from "../assets/images/letterbox/letterlist.webp";
// import receive from "../assets/images/letterbox/receive.webp";
// import send from "../assets/images/letterbox/send.webp";
import readletter from "../assets/images/letterbox/readletter.webp";
import unreadletter from "../assets/images/letterbox/unreadletter.webp";
import picture from "../assets/images/letterbox/picture.webp";
import BackButton from "../components/commons/BackButton";
import cat from "../assets/images/loading/cat2.webp"
import monkey from "../assets/images/loading/monkey.webp"


function MailList() {
  const navigate = useNavigate();
  const [selectedBook, setSelectedBook] = useState<string | null>(null);

  // 동화책별 편지 데이터 (예시)
  const bookLetters = {
    "금도끼 은도끼": [
      { date: "2025.04.22", title: "산신령과 나눈 편지", id: "1" },
      { date: "2025.04.15", title: "산신령과 나눈 편지", id: "2" },
    ],
    "아기 돼지 삼형제": [
      { date: "2025.04.20", title: "엄마 돼지와 나눈 편지", id: "3" },
      { date: "2025.04.10", title: "늑대와 나눈 편지", id: "4" },
    ],
    "백설공주": [
      { date: "2025.04.20", title: "백설공주와 나눈 편지", id: "6" },
      { date: "2025.04.17", title: "백설공주와 나눈 편지", id: "6" },
      { date: "2025.04.12", title: "난쟁이와 나눈 편지", id: "7" },
    ],
    "토끼와 베짱이": [
      { date: "2025.04.17", title: "토끼와 나눈 편지", id: "8" },
      { date: "2025.04.08", title: "베짱이와 나눈 편지", id: "9" },
    ],
  };

  const handleLetterClick = (letterId: string) => {
    // 편지 상세 페이지로 이동
    navigate(`/maildetail/${letterId}`);
  };

  const renderRightContent = () => {
    // 동화책이 선택되지 않았을 때 안내 메시지와 동물 캐릭터 표시
    if (!selectedBook) {
      return (
        <div className="flex flex-col items-center justify-center h-full">
          <h2 
            className="font-bazzi tablet2560:text-9xl mt-40 mb-4 text-center xl:text-7xl"
            // style={{ 
            //   textShadow: '-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000',
            //   WebkitTextStroke: '1px black',
            //   color: 'white'
            // }}
          >
            동화책을 선택해주세요~
          </h2>
          <div className="flex items-end xl:pt-10 gap-40 mt-10 pt-36">
            <img src={cat} alt="Cat" className="w-[15vw] tablet2560:w-[30rem] animate-bounce-slow" />
            <img src={monkey} alt="Monkey" className="w-[15vw] tablet2560:w-[30rem] animate-bounce-slow-delay" />
          </div>
        </div>
      );
    }
    
    // 선택된 동화책의 편지 목록 표시
    const letters = bookLetters[selectedBook as keyof typeof bookLetters] || [];
    
    return (
      <div className="grid grid-cols-2 gap-24 xl:gap-8 p-8">
        {letters.map((letter, index) => (
          <div 
            key={index} 
            className="relative cursor-pointer hover:scale-105 transition-transform"
            onClick={() => handleLetterClick(letter.id)}
          >
            <img src={picture} alt="Polaroid" className="w-[20vw] tablet2560:w-[25rem]" />
            <div className="text-maplestory font-bold xl:top-2 xl:text-base xl:left-5 absolute top-8 tablet2560:left-8 tablet2560:text-2xl tablet2560:mt-20 ms-6 text-gray-600">{letter.date}</div>
            <div className="absolute tablet2560:bottom-8 left-0 w-full text-center font-maplestory xl:bottom-6 tablet2560:text-3xl">
              {letter.title}
            </div>
          </div>
        ))}
      </div>
    );
  };

  // 뒤로가기 핸들러
  const handleBackButton = () => {
    if (selectedBook) {
      setSelectedBook(null); // 동화책 선택 취소
    } else {
      navigate(-1); // 이전 페이지로
    }
  };

  return (
    <div className="fixed inset-0 w-screen h-screen bg-cover bg-center" style={{ backgroundImage: `url(${mainpage})` }}>
      <BackButton onClick={handleBackButton} />
      <div className="flex justify-center items-center h-full">
        <div className="flex items-start gap-[4vw] tablet2560:gap-32">
          {/* Left Side - Letter List */}
          <div className="fixed left-[5vw] top-[10vh] xl:left-40 tablet2560:left-80 tablet2560:top-60 w-[35vw] xl:w-[25vw]">
            <img src={letterlist} alt="Letter List" className="w-full tablet2560:mt-16" />
            <div className="absolute top-0 left-0 px-20 tablet2560:px-24 xl:px-12 w-full pt-20 tablet2560:pt-48 xl:pt-16 flex flex-col justify-center">
              <ul className="space-y-4 tablet2560:space-y-8 font-maplestory text-xl tablet2560:text-4xl xl:text-2xl">
                <li 
                  className={`flex items-center gap-4 tablet2560:gap-8 ${selectedBook === "금도끼 은도끼" ? "bg-[#ECD5AB] bg-opacity-90" : "bg-[#e9ddc3] bg-opacity-40"} rounded-lg p-2 tablet2560:p-6 cursor-pointer hover:bg-opacity-100 transition-all`}
                  onClick={() => setSelectedBook("금도끼 은도끼")}
                >
                  <img src={selectedBook === "금도끼 은도끼" ? readletter : unreadletter} alt="Letter" className="w-[3vw] tablet2560:w-13" />
                  <span>금도끼 은도끼</span>
                </li>
                <li 
                  className={`flex items-center gap-4 tablet2560:gap-8 ${selectedBook === "아기 돼지 삼형제" ? "bg-[#ECD5AB] bg-opacity-90" : "bg-[#e9ddc3] bg-opacity-40"} rounded-lg p-2 tablet2560:p-6 cursor-pointer hover:bg-opacity-100 transition-all`}
                  onClick={() => setSelectedBook("아기 돼지 삼형제")}
                >
                  <img src={selectedBook === "아기 돼지 삼형제" ? readletter : unreadletter} alt="Letter" className="w-[3vw] tablet2560:w-13" />
                  <span>아기 돼지 삼형제</span>
                </li>
                <li 
                  className={`flex items-center gap-4 tablet2560:gap-8 ${selectedBook === "백설공주" ? "bg-[#ECD5AB] bg-opacity-90" : "bg-[#e9ddc3] bg-opacity-40"} rounded-lg p-2 tablet2560:p-6 cursor-pointer hover:bg-opacity-70 transition-all`}
                  onClick={() => setSelectedBook("백설공주")}
                >
                  <img src={selectedBook === "백설공주" ? readletter : unreadletter} alt="Letter" className="w-[3vw] tablet2560:w-13" />
                  <span>백설공주</span>
                </li>
                <li 
                  className={`flex items-center gap-4 tablet2560:gap-8 ${selectedBook === "토끼와 베짱이" ? "bg-[#ECD5AB] bg-opacity-90" : "bg-[#e9ddc3] bg-opacity-40"}  rounded-lg p-2 tablet2560:p-6 cursor-pointer hover:bg-opacity-70 transition-all`}
                  onClick={() => setSelectedBook("토끼와 베짱이")}
                >
                  <img src={selectedBook === "토끼와 베짱이" ? readletter : unreadletter} alt="Letter" className="w-[3vw] tablet2560:w-13" />
                  <span>토끼와 베짱이</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Right Side - Dynamic Content */}
          <div className="ml-[45vw] tablet2560:ml-[1000px] xl:ml-[35vw] mt-0 h-screen flex items-center">
            {renderRightContent()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MailList;
