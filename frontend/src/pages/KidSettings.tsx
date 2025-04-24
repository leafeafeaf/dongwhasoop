import { useNavigate } from "react-router-dom";

import mainpage from "../assets/images/mainpage/mainpage.webp";
import BackButton from "../components/commons/BackButton";
import Child from "../assets/images/settingpage/child.webp";
import CheckBox from "../assets/images/settingpage/checkbox.webp";
import TreeBox from "../assets/images/settingpage/treebox.webp";
import choiceCharacter from "../assets/images/settingpage/choicecharacter.png";

function KidSettings() {
  const navigate = useNavigate();

  return (
    <div
      className="relative inset-0 w-screen h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${mainpage})` }}
    >
      <BackButton to="/startsettings" />

      {/* 나무 안내판 */}
      <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
        <img src={TreeBox} alt="나무안내판" className="w-[35vw] max-w-[900px] h-auto " />

        <div className="absolute flex flex-col items-center mt-[10vh]">
          <button>
            <img src={choiceCharacter} alt="캐릭터 선택" className="w-[25vw] max-w-[700px]" />
          </button>
        </div>
        <div className="absolute mt-[50vh]">
          <input
            type="text"
            placeholder="이름을 입력해주세요"
            className="rounded-full px-4 py-2 text-xl text-center bg-yellow shadow-md w-[40vw] max-w-[300px]"
          />
        </div>
      </div>

      {/* 저장 버튼 */}
      <div className="absolute ml-[70vw] mt-[30vh]">
        <button onClick={() => navigate("/startsettings")}>
          <img src={CheckBox} alt="저장하기" className="w-[20vw] max-w-[600px]" />
        </button>
      </div>

      {/* 아이 이미지 */}
      <div className="absolute bottom-0 left-[5vw]">
        <img src={Child} alt="아이이미지" className="w-[35vw] max-w-[800px]" />
      </div>
    </div>
  );
}

export default KidSettings;
