import { useNavigate } from "react-router-dom";

import writeletterbackground from "../assets/images/writeletter/writeletterbackground.webp";

function SendWho() {
  const navigate = useNavigate();

  return (
    <div
      className="fixed inset-0 w-screen h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${writeletterbackground})` }}
    >
      <button onClick={() => navigate(-1)}>뒤로 가기</button>
      <h1>누구에게 편지를 쓸까요?</h1>
      <button onClick={() => navigate("/writeletter")}>신데렐라</button>
      <button onClick={() => navigate("/writeletter")}>난쟁이</button>
    </div>
  );
}

export default SendWho;
