import LoginBackground from "../assets/images/loginpage/loginbackground.webp";
import BookText from "../assets/images/loginpage/booktext.webp";
import KaKaoLogin from "../components/commons/KaKaoLoginButton.tsx";

function Login() {
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
          className="w-[40vw] max-w-[1000px] h-auto object-contain drop-shadow-2xl animate-triple-bounce"
        />
      </div>

      {/* 카카오 로그인 버튼 */}
      <KaKaoLogin></KaKaoLogin>
    </div>
  );
}

export default Login;
