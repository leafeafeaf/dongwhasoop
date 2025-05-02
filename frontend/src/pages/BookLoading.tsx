import { useEffect, useRef } from "react";
import bookintrobackground from "../assets/images/bookintro/bookintrobackground.webp";
import bookDummy from "../data/bookDummy";
import HTMLFlipBook from "react-pageflip";

const BookLoading = () => {
  const bookRef = useRef<any>(null);

  useEffect(() => {
    const flipInterval = setInterval(() => {
      if (bookRef.current) {
        bookRef.current.pageFlip().flipNext();
      }
    },1900); // 1초마다 페이지 넘김

    return () => clearInterval(flipInterval);
  }, []);

  return (
    <div
      className="fixed inset-0 w-screen h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bookintrobackground})` }}
    >
      <div className="text-[9vh] font-bazzi text-outline-sm text-center xl:mt-24">
        <h1 className="">동화숲에서 동화를 가져오고 있어요.</h1>
        <h1 className="">5~10분 정도 걸리니 기다려 주세요!</h1>
      </div>

      <div className="flex justify-center items-center mt-[4vw] relative animate-bounce-infinite3 ">
        {/* Book background */}
        <div className="absolute bg-[#2c3e50] rounded-lg shadow-2xl"
          style={{
            width: 'calc(1400px + 40px)',
            height: 'calc(900px + 40px)',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)',
          }}
        />
        <HTMLFlipBook
          ref={bookRef}
          width={window.innerWidth < 1280 ? 500 : 700}
          height={window.innerWidth < 1280 ? 700 : 900}
          size="stretch"
          minWidth={400}
          maxWidth={700}
          minHeight={600}
          maxHeight={900}
          className="z-10"
        >
            {bookDummy.slice(1, 36).map((book) => (
              <div
                key={book.id}
                className="relative bg-white rounded-lg shadow-lg"
              >
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-full h-full object-cover rounded-lg"
                />
                
              </div>
            ))
          }
        </HTMLFlipBook>
      </div>

      {/* <div className="flex justify-center items-center">
        <img
          src={kidbook}
          alt="kidbook"
          className="w-[20vw] animate-fly"
        />
      </div> */}
    </div>
  );
};

export default BookLoading;
