import { useNavigate } from "react-router-dom";

function BookDetail() {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate(-1)}>뒤로 가기</button>
      <h1>책 상세페이지</h1>
      <p>흥부와 놀부입니다.</p>
      <button onClick={() => navigate("/bookend")}>넘어가기</button>
    </div>
  );
}

export default BookDetail;
