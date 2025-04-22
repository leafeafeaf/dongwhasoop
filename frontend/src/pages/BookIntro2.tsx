import { useNavigate } from "react-router-dom";

function BookIntro2() {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate(-1)}></button>
      <h1>누가 읽을까요?</h1>
      <button>엄마</button>
      <button>아빠</button>
      <button>곰돌이</button>
    </div>
  );
}

export default BookIntro2;
