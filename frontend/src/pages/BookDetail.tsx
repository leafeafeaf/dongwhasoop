import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

import BackButton from "../components/commons/BackButton";
import NextPage from "../assets/images/detailpage/nextpage.webp";
import PrevPage from "../assets/images/detailpage/prevpage.webp";
import GoFront from "../assets/images/BookList/gofront.webp";
import RestartBook from "../assets/images/detailpage/restart.webp";

// 더미데이터
import shimcheongDetail from "../data/bookDetailDummy";

function BookDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const book = shimcheongDetail;

  const [currentPage, setCurrentPage] = useState(0);
  const currentContent = book.pages[currentPage];

  return (
    <div
      className="fixed inset-0 w-screen h-screen bg-cover bg-center text-white"
      style={{ backgroundImage: `url(${currentContent.image})` }}
    >
      {/* 뒤로가기 버튼 */}
      <BackButton to={`/introbook/${id}`} />

      {/* 텍스트 영역 */}
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-[15vh] px-[5vw]">
        <p className="text-[3vh] font-bazzi text-center bg-black/50 p-4 rounded-xl shadow-md max-w-[90vw]">
          {currentContent.text}
        </p>
      </div>

      {/* 페이지 넘김 버튼 */}
      <div className="absolute bottom-[5vh] w-full flex justify-center gap-[80vw] z-[10]">
        {/* 이전 버튼 */}
        {currentPage > 0 ? (
          <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}>
            <img src={PrevPage} alt="이전" className="w-[10vw] max-w-[120px]" />
          </button>
        ) : (
          <div className="w-[10vw] max-w-[120px]" />
        )}

        {/* 다음 버튼 */}
        {currentPage < book.pages.length - 1 ? (
          <button onClick={() => setCurrentPage((prev) => prev + 1)}>
            <img src={NextPage} alt="다음" className="w-[10vw] max-w-[120px]" />
          </button>
        ) : (
          <button onClick={() => navigate("/bookend")}>
            <img src={GoFront} alt="넘어가기" className="w-[10vw] max-w-[120px]" />
          </button>
        )}
      </div>

      {/* 다시보기 버튼 */}
      {currentPage === book.pages.length - 1 && (
        <div className="absolute right-[5vw] bottom-[17vh] z-[10]">
          <button onClick={() => setCurrentPage(0)}>
            <img src={RestartBook} alt="다시 보기" className="w-[12vw] max-w-[150px]" />
          </button>
        </div>
      )}
    </div>
  );
}

export default BookDetail;
