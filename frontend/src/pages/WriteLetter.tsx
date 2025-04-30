import { useNavigate } from "react-router-dom";
import { useState } from "react";

import writeletterbackground from "../assets/images/writeletter/writeletterback.webp";
import record from "../assets/images/writeletter/record.webp";
import send from "../assets/images/writeletter/send.webp";
import BackButton from "../components/commons/BackButton";
import Modal from "../components/commons/Modal";

function WriteLetter() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
    const handleSendClick = () => {
    setIsModalOpen(true);
  };

  return (
    <div
      className="fixed inset-0 w-screen h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${writeletterbackground})` }}
    >
      <BackButton to="/sendwho"/>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => navigate("/sendletter")}
        type="send"
      />

      <div className="fixed right-12 top-1/2 -translate-y-1/2 flex flex-col gap-4 px-16">
        <button>
          <img src={record} alt="record" className="w-[20vw] max-w-[1200px] min-w-[100px]"/>
        </button>
        <button onClick={handleSendClick}>
          <img src={send} alt="send" className="w-[20vw] max-w-[1200px] min-w-[100px]"/>
        </button>
      </div>

    </div>
  );
}

export default WriteLetter;
