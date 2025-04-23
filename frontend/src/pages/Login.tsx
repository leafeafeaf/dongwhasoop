import { useNavigate } from "react-router-dom";
import LoginBackground from "../assets/images/loginpage/LoginBackground.webp";
import BookText from "../assets/images/loginpage/booktext.webp";

function Login() {
  const navigate = useNavigate();

  return (
    /* 페이지마다 이미지 지정하는 법! */
    <div
      className="fixed inset-0 w-screen h-screen bg-cover bg-center text-white"
      style={{ backgroundImage: `url(${LoginBackground})` }}
    >
      {/* 동화숲 로고 */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <img
          src={BookText}
          alt="동화숲 로고"
          className="w-[80vw] max-w-[1000px] h-auto object-contain drop-shadow-2xl animate-triple-bounce"
        />
      </div>

      {/* 카카오 로그인 버튼 */}
      <div className="absolute bottom-[20vh] w-full flex justify-center">
        <button
          className="bg-yellow-300 hover:bg-yellow-400 text-black rounded 
                     text-xl sm:text-2xl font-bold
                     w-[60vw] max-w-[1200px] h-[8vh] min-h-[56px]"
          onClick={() => navigate("/profile")}
        >
          카카오 로그인
        </button>
      </div>
    </div>
  );
}

export default Login;
