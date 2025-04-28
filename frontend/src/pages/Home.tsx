import { useNavigate } from "react-router-dom";

import HomeBackground from "../assets/images/mainpage/homebackground.webp";
import BackButton from "../components/commons/BackButton";
import Book from "../assets/images/mainpage/book.webp";
import MailBox from "../assets/images/mainpage/mailbox.webp";
import Selectprofile from "../assets/images/mainpage/selectprofile.webp";
// import MusicOff from "../assets/images/mainpage/musicoff.webp";
// import MusicOn from "../assets/images/mainpage/musicon.webp";

function Home() {
  const navigate = useNavigate();

  return (
    <div
      className="fixed inset-0 w-screen h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${HomeBackground})` }}
    >
      {/* 프로필 선택 */}
      <button 
        onClick={() => navigate("/profile")} 
        className="absolute top-7 left-7"
      >
        <img src={Selectprofile} alt="프로필 선택" className="w-[15vw] max-w-[2000px] min-w-[80px]" />
      </button>

      {/* 중앙 이미지 버튼들 */}
      <div className="flex justify-center items-center h-full gap-[9vw] mt-[15vh]">
        {/* 동화 문구, 이미지 */}
        <div className="mb-[20vh]">
          {/* 동화 */}
          <h1 className="text-[17vh] font-bazzi text-red-600 text-outline text-center">동화</h1>

          {/* 동화 이미지 */}
          <button onClick={() => navigate("/booklist")}>
            <img src={Book} alt="동화" className="w-[30vw] max-w-[1200px] min-w-[100px]" />
          </button>
        </div>

        {/* 우편함 문구, 이미지 */}
        <div className="mb-[20vh]">
          {/* 우편함 문구 */}
          <h1 className="text-[17vh] font-bazzi text-yellow-500 text-outline text-center">우편함</h1>

          {/* 우편함 이미지 */}
          <button onClick={() => navigate("/letterlist")}>
            <img src={MailBox} alt="우편함" className="w-[30vw] max-w-[1200px] min-w-[100px]" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
