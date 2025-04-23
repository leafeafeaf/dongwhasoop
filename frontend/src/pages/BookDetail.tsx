import { useNavigate } from "react-router-dom";

import BackButton from "../components/commons/BackButton";

function BookDetail() {
  const navigate = useNavigate();

  return (
    <div>
      <BackButton />
      <h1>책 상세페이지</h1>
      <p>흥부와 놀부입니다.</p>
      <button onClick={() => navigate("/bookend")}>넘어가기</button>
    </div>
  );
}

export default BookDetail;
