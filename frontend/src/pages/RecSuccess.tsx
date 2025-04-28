import { useNavigate } from "react-router-dom";

import mainpage from "../assets/images/mainpage/mainpage.webp";
import RightButton from "../assets/buttons/rightbutton.webp";
import RecAlert from "../assets/images/settingpage/recalert.webp";

// 상황별 내용과 버튼 네비가 달라져야함.
// 1. 녹음 완료 -> 녹음 완료 피드백, startsettings 으로 네비
// 2. 아이 등록 완료 -> 피드백, startsettings 으로 네비
// 3. 모든 정보 등록 완료 -> 피드백, home으로 네비비

function RecSuccess() {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 w-screen h-screen bg-cover bg-center" style={{ backgroundImage: `url(${mainpage})` }}>

      {/* 경고 안내문 */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center w-[95vw] max-w-[1800px] lg:w-[60vw] md:mt-[3vw]">
        <img src={RecAlert} alt="경고안내문" className="w-full h-auto" />
        <div className="absolute flex flex-col items-center gap-5 w-full mt-8">
          <h1 className="text-[8vh] font-bazzi text-center text-outline-ss mb-4">자녀 등록이 완료되었어요</h1>
          <h1 className="text-[8vh] font-bazzi text-center text-outline-ss mb-4">녹음이 완료되었어요</h1>
          <h1 className="text-[8vh] font-bazzi text-center text-outline-ss mb-4">성공적으로 등록되었어요</h1>
        </div>
      </div>

      {/* 다음 버튼 */}
      <div className="absolute w-[15vw] max-w-[300px] right-0 mr-[10vh] top-[40vh]">
        <button onClick={() => navigate("/startsettings")}>
          <img src={RightButton} alt="넘어가기" />
        </button>
      </div>
    </div>
  );
}

export default RecSuccess;
