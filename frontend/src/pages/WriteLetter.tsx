import { useNavigate } from "react-router-dom";

import writeletterbackground from "../assets/images/writeletter/writeletterbackground.webp";

function WriteLetter() {
  const navigate = useNavigate();

  return (
    <div
      className="fixed inset-0 w-screen h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${writeletterbackground})` }}
    >
      <button onClick={() => navigate(-1)}>뒤로 가기</button>
      <h1>이 곳은 편지쓰는 곳입니다.</h1>
      <button>녹음하기</button>
      <button onClick={() => navigate("/home")}>보내기</button>
    </div>
  );
}

export default WriteLetter;
