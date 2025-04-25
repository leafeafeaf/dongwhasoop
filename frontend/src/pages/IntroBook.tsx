import { useNavigate, useParams } from "react-router-dom";

import bookintrobackground from "../assets/images/bookintro/bookintrobackground.webp";
import BackButton from "../components/commons/BackButton";
import Mother from "../assets/images/bookintro/mother.webp";
import Father from "../assets/images/bookintro/father.webp";
import Bear1 from "../assets/images/bookintro/bear1.webp";

function IntroBook() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div
      className="fixed inset-0 w-screen h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bookintrobackground})` }}
    >
      <BackButton to={`/intro/${id}`} />

      <h1 className="text-[13vh] font-bazzi text-black-500 text-outline text-center mt-[9vh]">어떻게 읽을까요?</h1>

      <div className="flex justify-center items-center h-full gap-x-[0vw] mt-[-15vh]">
        <button onClick={() => navigate(`/bookdetail/${id}`)}>
          <img src={Mother} alt="엄마목소리" className="w-[45vw] sm:w-[35vw] lg:w-[18vw] max-w-[400px]" />
        </button>
        <button onClick={() => navigate(`/bookdetail/${id}`)}>
          <img src={Father} alt="아빠목소리" className="w-[45vw] sm:w-[35vw] lg:w-[18vw] max-w-[400px]" />
        </button>
        <button onClick={() => navigate(`/bookdetail/${id}`)}>
          <img src={Bear1} alt="곰돌이목소리" className="w-[45vw] sm:w-[35vw] lg:w-[18vw] max-w-[400px]" />
        </button>
      </div>
    </div>
  );
}

export default IntroBook;
