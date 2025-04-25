import { useNavigate, useParams } from "react-router-dom";
import bookintrobackground from "../assets/images/bookintro/bookintrobackground.webp";
import BackButton from "../components/commons/BackButton";
import Fairytale from "../assets/images/bookintro/bear.webp";
import Song from "../assets/images/bookintro/fairytale.webp";
import bookDummy from "../data/bookDummy";

function Intro() {
  const navigate = useNavigate();
  const { id } = useParams();

  const selectedBook = bookDummy.find((book) => book.id === Number(id));

  if (!selectedBook) {
    return <div className="text-white">책 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <div
      className="fixed inset-0 w-screen h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bookintrobackground})` }}
    >
      {/* 뒤로가기 */}
      <BackButton to="/booklist" />

      {/* 상단 텍스트 */}
      <h1 className="text-[5vh] sm:text-[6vh] lg:text-[7vh] font-bazzi text-black text-outline text-center mt-[6vh]">
        어떻게 읽을까요?
      </h1>

      {/* 콘텐츠 영역 */}
      <div className="flex flex-col lg:flex-row justify-center items-center h-full gap-[5vh] mt-[5vh] lg:mt-[4vh]">
        {/* 책 표지 + 제목 */}
        <div className="flex flex-col items-center">
          <img
            src={selectedBook.cover}
            alt="책 표지"
            className="w-[45vw] sm:w-[35vw] lg:w-[20vw] max-w-[400px] rounded-xl border-4 border-white shadow-lg"
          />
          <h2 className="mt-4 text-[4vh] sm:text-[5vh] font-bazzi text-center text-[#4e4e4e] text-outline">
            {selectedBook.title}
          </h2>
        </div>

        {/* 버튼 영역 */}
        <div className="flex flex-col gap-[4vh] mt-[4vh] lg:mt-0">
          <button onClick={() => navigate(`/introsong/${id}`)}>
            <img src={Song} alt="동요" className="w-[45vw] sm:w-[35vw] lg:w-[18vw] max-w-[400px]" />
          </button>
          <button onClick={() => navigate(`/introbook/${id}`)}>
            <img src={Fairytale} alt="동화" className="w-[45vw] sm:w-[35vw] lg:w-[18vw] max-w-[400px]" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Intro;
