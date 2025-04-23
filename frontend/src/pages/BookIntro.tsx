import { useNavigate } from "react-router-dom";

import bookintrobackground from "../assets/images/bookintro/bookintrobackground.webp";

function BookIntro1() {
  const navigate = useNavigate();

  return (
    <div
      className="fixed inset-0 w-screen h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bookintrobackground})` }}
    >
      <button onClick={() => navigate(-1)}></button>
      <h1>어떻게 읽을까요?</h1>
      <button onClick={() => navigate("/bookintrosong")}>동요</button>
      <button onClick={() => navigate("/bookintrobook")}>동화</button>
    </div>
  );
}

export default BookIntro1;
