import { useNavigate } from "react-router-dom";

function MailDetail() {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate(-1)}>뒤로 가기</button>
      <h1>이 곳은 메일 상세 페이지입니다.</h1>
    </div>
  );
}

export default MailDetail;
