import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckIsRegistered, login } from "../api/authApi";
import { LoginApiResponse } from "../types/auth";

function KakaoCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");
    if (code) {
      handleKakaoLogin(code);
    }
  }, []);

  const handleKakaoLogin = async (code: string) => {
    try {
      // 회원인지 아닌지 확인
      const { isRegistered, idToken } = await CheckIsRegistered(code);

      if (isRegistered) {
        // 기존 회원이면 프로필 페이지로
        const loginData: LoginApiResponse["data"] = await login(idToken);
        localStorage.setItem("accessToken", loginData.accessToken);
        localStorage.setItem("refreshToken", loginData.refreshToken);
        navigate("/profile");
      } else {
        // 신규회원이면 초기 세팅으로
        navigate("/startsettings", {
          state: {
            idToken,
          },
        });
      }
    } catch (error) {
      console.error("소셜 로그인 실패:", error);
      navigate("/");
    }
  };
  return <div>로그인 중입니다...</div>;
}

export default KakaoCallback;
