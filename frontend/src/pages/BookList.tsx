import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import booklistbackground from "../assets/images/booklist/booklistbackground.webp";
import BackButton from "../components/commons/BackButton";
import GoBack from "../assets/images/BookList/goback.webp";
import GoFront from "../assets/images/BookList/gofront.webp";

import useBookStore from "../hooks/useBooks";
import bookDummy from "../data/bookDummy";

function BookList() {
  const booksPerPage = 6;
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(bookDummy.length / booksPerPage);
  const navigate = useNavigate();
  const setBooks = useBookStore((state) => state.setBooks);

  useEffect(() => {
    setBooks(bookDummy);
  }, [setBooks]);

  const handlePrev = () => {
    if (page > 0) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages - 1) setPage(page + 1);
  };

  const visibleBooks = bookDummy.slice(page * booksPerPage, (page + 1) * booksPerPage);

  return (
    <div
      className="fixed inset-0 w-screen h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${booklistbackground})` }}
    >
      <BackButton to="/home" />

      {/* 책 리스트 */}
      <div className="flex flex-col justify-center items-center min-h-[70vh]">
        <div className="grid grid-cols-3 gap-y-[2vh] gap-x-[5vw] lg:gap-x-[8vw] px-[25vw] mt-[25vh] sm:mt-[15vh] md:mt-[15vh] lg:mt-[15vh] xl:mt-[4vh] 2xl:mt-[15vh]">
          {visibleBooks.map((book, index) => (
            <div
              key={index}
              className="flex flex-col items-center cursor-pointer"
              onClick={() => navigate(`/intro/${book.id}`)}
            >
              <img
                src={book.cover}
                alt={book.title}
                className="w-[15vw] md:w[25vw] max-w-[343px] rounded-xl border-4 border-white shadow-md"
              />
              <h3 className="mt-2 text-[2.8vh] font-bazzi text-blue text-outline-sm text-center">{book.title}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* 뒤로, 앞으로 버튼 */}
      <div className="absolute bottom-[2vh] w-full flex justify-center gap-[80vw] mb-[40vh]">
        {page > 0 ? (
          <button onClick={handlePrev}>
            <img src={GoBack} alt="이전" className="w-[10vw] max-w-[300px]" />
          </button>
        ) : (
          <div className="w-[10vw] max-w-[300px]" />
        )}

        {page < totalPages - 1 ? (
          <button onClick={handleNext}>
            <img src={GoFront} alt="다음" className="w-[10vw] max-w-[300px]" />
          </button>
        ) : (
          <div className="w-[10vw] max-w-[300px]" />
        )}
      </div>
    </div>
  );
}

export default BookList;
