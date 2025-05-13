import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function KakaoCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URL(window.location.href).searchParams;
    const accessToken = searchParams.get("access_token");
    const refreshToken = searchParams.get("refresh_token"); // optional
    const isNewUser = searchParams.get("isNewUser");

    if (!accessToken) {
      alert("로그인에 실패했습니다. access_token이 없습니다.");
      navigate("/");
      return;
    }

    // 저장
    localStorage.setItem("accessToken", accessToken);
    if (refreshToken) {
      localStorage.setItem("refreshToken", refreshToken);
    }

    if (isNewUser === "true") {
      navigate("/startsettings");
    } else {
      navigate("/profile");
    }
  }, [navigate]);

  return <div>로그인 처리 중입니다...</div>;
}

export default KakaoCallback;
