import { useNavigate } from "react-router-dom";

function SendWho() {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate(-1)}>뒤로 가기</button>
      <h1>누구에게 편지를 쓸까요?</h1>
      <button onClick={() => navigate("/writeletter")}>신데렐라</button>
      <button onClick={() => navigate("/writeletter")}>난쟁이</button>
    </div>
  );
}

export default SendWho;
