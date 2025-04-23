import { useNavigate } from "react-router-dom";

import writeletterbackground from "../assets/images/writeletter/writeletterbackground.webp";
import BackButton from "../components/commons/BackButton";

function SendWho() {
  const navigate = useNavigate();

  return (
    <div
      className="fixed inset-0 w-screen h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${writeletterbackground})` }}
    >
      <BackButton></BackButton>
      <h1>누구에게 편지를 쓸까요?</h1>
      <button onClick={() => navigate("/writeletter")}>신데렐라</button>
      <button onClick={() => navigate("/writeletter")}>난쟁이</button>
    </div>
  );
}

export default SendWho;
