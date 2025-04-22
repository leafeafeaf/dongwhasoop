import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>이 곳은 로그인 화면입니다.</h1>
      <button onClick={() => navigate("/profile")}>홈으로 가기</button>
    </div>
  );
}

export default Login;
