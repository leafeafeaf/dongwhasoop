// import { useNavigate } from "react-router-dom";

import mainpage from "../assets/images/mainpage/mainpage.webp";
import letterlist from "../assets/images/letterbox/letterlist.webp";
import receive from "../assets/images/letterbox/receive.webp";
import send from "../assets/images/letterbox/send.webp";
import readletter from "../assets/images/letterbox/readletter.webp";
import unreadletter from "../assets/images/letterbox/unreadletter.webp";
import BackButton from "../components/commons/BackButton";

function MailList() {
  return (
    <div className="fixed inset-0 w-screen h-screen bg-cover bg-center" style={{ backgroundImage: `url(${mainpage})` }}>
      <BackButton to="/home" />

      <div className="flex justify-center items-center h-full">
        <div className="flex items-center gap-[4vw] tablet2560:gap-32">
          <div className="relative w-[30vw]  mt-[10vh] tablet2560:mt-40 ms-[5vw] tablet2560:ms-40">
            <img src={letterlist} alt="Letter List" className="w-full" />
            <div className="absolute top-0 left-0 px-20 tablet2560:px-36 w-full pt-20 tablet2560:pt-40 flex flex-col justify-center">
              <ul className="space-y-4 tablet2560:space-y-6 font-maplestory text-xl tablet2560:text-4xl">
                <li className="flex items-center gap-4 tablet2560:gap-8 bg-[#ECD5AB] bg-opacity-90 rounded-lg p-4 tablet2560:p-8 cursor-pointer hover:bg-opacity-100 transition-all">
                  <img src={unreadletter} alt="Unread Letter" className="w-[3vw] tablet2560:w-13" />
                  <span>금도끼 은도끼</span>
                </li>
                <li className="flex items-center gap-4 tablet2560:gap-8 bg-[#ECD5AB] bg-opacity-90 rounded-lg p-4 tablet2560:p-8 cursor-pointer hover:bg-opacity-100 transition-all">
                  <img src={unreadletter} alt="Unread Letter" className="w-[3vw] tablet2560:w-13" />
                  <span>아기 돼지 삼형제</span>
                </li>
                <li className="flex items-center gap-4 tablet2560:gap-8 bg-[#e9ddc3] bg-opacity-40 rounded-lg py-2 ps-4 tablet2560:py-4 tablet2560:px-8 cursor-pointer hover:bg-opacity-70 transition-all">
                  <img src={readletter} alt="Read Letter" className="w-[3vw] tablet2560:w-13" />
                  <span>백설공주</span>
                </li>
                <li className="flex items-center gap-4 tablet2560:gap-8 bg-[#e9ddc3] bg-opacity-40 rounded-lg py-2 ps-4 tablet2560:py-4 tablet2560:px-8 cursor-pointer hover:bg-opacity-70 transition-all">
                  <img src={readletter} alt="Read Letter" className="w-[3vw] tablet2560:w-13" />
                  <span>토끼와 베짱이</span>
                </li>
              </ul>
            </div>
          </div>
          <img 
            src={receive} 
            alt="Received Letters" 
            className="w-[25vw] tablet2560:w-[33rem] cursor-pointer hover:scale-105 transition-transform" 
          />
          <img 
            src={send} 
            alt="Sent Letters" 
            className="w-[25vw] tablet2560:w-[33rem] tablet2560:me-14 cursor-pointer hover:scale-105 transition-transform" 
          />
        </div>
      </div>
    </div>
  );
}

export default MailList;
