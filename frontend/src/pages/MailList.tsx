import { useNavigate } from "react-router-dom";

function MailList() {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate(-1)}></button>
      <h1>이 곳은 북 리스트 페이지입니다.</h1>
    </div>
  );
}

export default MailList;
