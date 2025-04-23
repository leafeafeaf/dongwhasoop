import { useNavigate } from "react-router-dom";

import bookintrobackground from "../assets/images/bookintro/bookintrobackground.webp";
import BackButton from "../components/commons/BackButton";

function Intro() {
  const navigate = useNavigate();

  return (
    <div
      className="fixed inset-0 w-screen h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bookintrobackground})` }}
    >
      <BackButton />
      <h1>어떻게 읽을까요?</h1>
      <button onClick={() => navigate("/introsong")}>동요</button>
      <button onClick={() => navigate("/introbook")}>동화</button>
    </div>
  );
}

export default Intro;
