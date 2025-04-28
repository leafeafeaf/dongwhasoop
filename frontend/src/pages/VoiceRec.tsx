// import { useNavigate } from "react-router-dom";
import mainpage from "../assets/images/mainpage/mainpage.webp";
import BackButton from "../components/commons/BackButton";
import ReadChild from "../assets/images/settingpage/readchild.webp";
import SittingChild from "../assets/images/settingpage/sittingchild.webp";
import SubmitRec from "../assets/images/settingpage/submitrec.webp";
import RecStory from "../assets/images/settingpage/recstory.webp";

function VoiceRec() {
  // const navigate = useNavigate();

  return (
    <div className="fixed inset-0 w-screen h-screen bg-cover bg-center" style={{ backgroundImage: `url(${mainpage})` }}>
      <BackButton></BackButton>
      <h1 className="absolute text-[6vh] font-bazzi text-white text-center ">아래 대본을 읽어주세요.</h1>

      {/* 녹음 버튼 */}
      <button>
        <img src={RecStory} alt="녹음하기" />
      </button>

      {/* 등록 버튼 */}
      <button>
        <img src={SubmitRec} alt="등록하기" />
      </button>

      {/* 아이들 이미지 */}
      <div>
        <img src={SittingChild} alt="앉아있는아이" />
        <img src={ReadChild} alt="책읽는아이" />
      </div>
    </div>
  );
}

export default VoiceRec;
