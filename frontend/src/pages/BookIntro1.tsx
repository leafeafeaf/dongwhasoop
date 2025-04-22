import { useNavigate } from "react-router-dom";

function BookIntro1() {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate(-1)}></button>
      <h1>어떻게 읽을까요?</h1>
      <button onClick={() => navigate("/songdetail")}>동요</button>
      <button onClick={() => navigate("/bookdetail")}>동화</button>
    </div>
  );
}

export default BookIntro1;
