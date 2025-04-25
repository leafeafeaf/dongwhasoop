import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import mainpage from "../assets/images/mainpage/mainpage.webp";
import LetterBird from "../assets/images/writeletter/letterbird.webp";

function SendLetter() {
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/home");
    }, 4000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="fixed inset-0 w-screen h-screen bg-cover bg-center" style={{ backgroundImage: `url(${mainpage})` }}>

      <div className="text-[10vh] font-bazzi text-outline-sm text-center mt-28">
        <h1 className="">무사히 편지를 전달했어요~</h1>
        <h1 className="">도착까지 3일이 걸려요~</h1>
      </div>

      <div className="absolute top-2/3 left-1/2 -translate-x-2/3 -translate-y-1/2">
        <img
          src={LetterBird}
          alt="새 이미지"
          className="w-[50vw] max-w-[1000px] h-auto object-contain drop-shadow-2xl animate-fly"
        />
      </div>
    </div>
  );
}

export default SendLetter;
