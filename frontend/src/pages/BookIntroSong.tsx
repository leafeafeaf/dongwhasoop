import { useNavigate } from "react-router-dom";

import bookintrobackground from "../assets/images/bookintro/bookintrobackground.webp";

function BookIntroSong() {
  const navigate = useNavigate();

  return (
    <div
      className="fixed inset-0 w-screen h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bookintrobackground})` }}
    >
      <button onClick={() => navigate(-1)}></button>
      <h1>누가 읽을까요?</h1>
      <button>엄마</button>
      <button>아빠</button>
      <button>곰돌이</button>
    </div>
  );
}

export default BookIntroSong;
