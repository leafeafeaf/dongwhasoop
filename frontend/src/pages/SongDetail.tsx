import { useNavigate } from "react-router-dom";

function SongDetail() {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate(-1)}>뒤로 가기</button>
      <h1>이 곳은 동요 상세페이지입니다.</h1>
      <button onClick={() => navigate("/songend")}>넘어가기</button>
    </div>
  );
}

export default SongDetail;
