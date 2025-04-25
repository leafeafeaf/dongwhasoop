import { useNavigate, useParams } from "react-router-dom";

import BackButton from "../components/commons/BackButton";

function SongDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div>
      <BackButton to={`/introsong/${id}`}></BackButton>
      <h1>이 곳은 동요 상세페이지입니다.</h1>
      <button onClick={() => navigate("/songend")}>넘어가기</button>
    </div>
  );
}

export default SongDetail;
