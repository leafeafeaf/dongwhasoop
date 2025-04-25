import { useNavigate } from "react-router-dom";

import selectbackground from "../assets/images/writeletter/selectbackground.webp";
import BackButton from "../components/commons/BackButton";

function SendWho() {
  const navigate = useNavigate();

  return (
    <div
      className="fixed inset-0 w-screen h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${selectbackground})` }}
    >
      <BackButton to="/bookend"></BackButton>
      <div className="flex justify-center h-screen gap-28 mt-28">
        <button onClick={() => navigate("/writeletter")} className="text-[8vh] font-bazzi text-outline-sm text-center">신데렐라</button>
        <button onClick={() => navigate("/writeletter")} className="text-[8vh] font-bazzi text-outline-sm text-center">난쟁이</button>
      </div>
    </div>
  );
}

export default SendWho;
