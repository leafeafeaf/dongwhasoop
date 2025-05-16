import { useState } from "react";
import DeleteUserModal from "./DeleteUserModal";

function DeleteAccountButton() {
  const [showModal, setShowModal] = useState(false);

  const handleConfirmDelete = () => {
    const code = localStorage.getItem("authCode");
    if (!code) {
      alert("탈퇴를 위한 인증 코드가 없습니다.");
      return;
    }

    setShowModal(false);
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="fixed right-[3vw] top-[3vh] px-[2vw] py-[1.5vh] text-red-600 border-4 border-red-600 rounded-lg
        text-[2vh] md:text-[2.2vh] lg:text-[2.4vh] font-medium"
      >
        회원탈퇴
      </button>

      {showModal && (
        <DeleteUserModal
          onConfirm={handleConfirmDelete}
          onCancel={() => setShowModal(false)}
        />
      )}
    </>
  );
}

export default DeleteAccountButton;
