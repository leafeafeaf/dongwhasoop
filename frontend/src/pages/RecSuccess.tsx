import { useNavigate } from "react-router-dom";

import mainpage from "../assets/images/mainpage/mainpage.webp";
import RightButton from "../assets/buttons/rightbutton.webp";
import RecAlert from "../assets/images/settingpage/recalert.png";

function RecSuccess() {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 w-screen h-screen bg-cover bg-center" style={{ backgroundImage: `url(${mainpage})` }}>
      <h1>녹음이 완료되었어요.</h1>

      {/* 경고 안내문 */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center w-[95vw] max-w-[1800px] lg:w-[60vw] md:mt-[5vw]">
        <img src={RecAlert} alt="경고안내문" className="w-full h-auto" />
      </div>

      {/* 다음 버튼 */}
      <div className="absolute w-[15vw] max-w-[300px] right-0 mr-[10vh] top-[40vh]">
        <button onClick={() => navigate("/voicerec")}>
          <img src={RightButton} alt="넘어가기" />
        </button>
      </div>
    </div>
  );
}

export default RecSuccess;
