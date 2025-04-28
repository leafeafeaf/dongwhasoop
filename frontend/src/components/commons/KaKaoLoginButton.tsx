import { useCallback } from "react";
import KaKaoIcon from "../../assets/icons/kakao.webp";

function KakaoLoginButton() {
  const handleKakaoLogin = useCallback(() => {
    const KAKAO_REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
    const REDIRECT_URI = "http://localhost:5173/auth";

    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    window.location.href = kakaoURL;
  }, []);

  return (
    <div className="absolute bottom-[20vh] w-full flex justify-center">
      <img src={KaKaoIcon} alt="카카오로고" className="absolute h-[8vh]" />
      <button
        className="bg-yellow-300 hover:bg-yellow-400 text-black rounded-[20px] 
                 text-xl sm:text-2xl font-bold
                 w-[60vw] max-w-[1200px] h-[8vh] min-h-[56px]"
        onClick={handleKakaoLogin}
      >
        카카오 로그인
      </button>
    </div>
  );
}

export default KakaoLoginButton;
