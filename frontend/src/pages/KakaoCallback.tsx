import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/credentials/oauth/kakao`, {
        code,
      });

      const { accessToken } = response.data.data;
      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
        navigate("/profile");
      } else {
        console.error("accessToken 없음");
        navigate("/");
      }
    } catch (error) {
      console.error("로그인 실패:", error);
      navigate("/");
    }
  };

  return <div>로그인 중입니다...</div>;
}

export default KakaoCallback;
