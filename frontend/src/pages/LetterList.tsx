import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLetterStore } from "../stores/letterStore";
import { getLetterBookList } from "../api/letter";
import mainpage from "../assets/images/mainpage/mainpage.webp";
import letterlist from "../assets/images/letterbox/letterlist.webp";
import readletter from "../assets/images/letterbox/readletter.webp";
import unreadletter from "../assets/images/letterbox/unreadletter.webp";
import picture from "../assets/images/letterbox/picture.webp";
import letterpicture from "../assets/images/letterbox/letterpicture.webp";
import BackButton from "../components/commons/BackButton";
import cat from "../assets/images/loading/cat2.webp"
import monkey from "../assets/images/loading/monkey.webp"
import { useGetLetterBookList } from "../hooks/useGetLetterBookList"

function LetterList() {
  const navigate = useNavigate();
  const { selectedBookId, setSelectedBook } = useLetterStore();  // totalLetterBooks 관련 제거

  // React Query로 데이터 fetching
  const { data: letterBooks, isLoading, error } = useGetLetterBookList();

  // 데이터 확인용 로그
  useEffect(() => {
    if (letterBooks?.data?.book) {
      console.log("현재 보유한 동화책:", letterBooks.data.book);
    }
  }, [letterBooks]);

  // 편지 상세 페이지로 이동
  const handleLetterClick = (letterId: string) => {
    navigate(`/letterdetail/${letterId}`);
  };

  // 선택되지 않은 경우 안내 메시지 표시
  const renderRightContent = () => {
    if (isLoading) {
      return <div>로딩 중...</div>;
    }

    if (error) {
      return <div>편지함을 불러오는데 실패했습니다.</div>;
    }

    if (!letterBooks?.data?.book || letterBooks.data.book.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center h-full">
          <h2 className="font-bazzi text-outline-sm text-[7vh] mt-40 mb-4 text-center">
            편지를 작성한 동화책이 없어요~
          </h2>
          <div className="flex items-end xl:pt-10 gap-40 mt-[5vh] mb-[7vh]">
            <img src={cat} alt="Cat" className="w-[15vw] animate-shake1" />
            <img src={monkey} alt="Monkey" className="w-[15vw] animate-shake2" />
          </div>
        </div>
      );
    }

    if (!selectedBookId) {
      return (
        <div className="flex flex-col items-center justify-center h-full">
          <h2 className="font-bazzi text-outline-sm text-[10vh] mt-40 mb-4 text-center">
            동화책을 선택해주세요~
          </h2>
          <div className="flex items-end xl:pt-10 gap-40 mt-[5vh] mb-[7vh]">
            <img src={cat} alt="Cat" className="w-[15vw] animate-shake1" />
            <img src={monkey} alt="Monkey" className="w-[15vw] animate-shake2" />
          </div>
        </div>
      );
    }

    const selectedBook = letterBooks?.data?.book.find(book => book.book_id === selectedBookId);
    if (!selectedBook) return null;

    return (
      // <div className="grid grid-cols-2 gap-24 xl:gap-8 tablet2560:gap-36 p-8">
      //   {letters.map((letter, index) => (
      //     <div
      //       key={index}
      //       className="relative cursor-pointer hover:scale-105 transition-transform"
      //       onClick={() => handleLetterClick(letter.id)}
      //     >
      //       <img src={letterpicture} alt="Polaroid" className="w-[20vw] tablet2560:w-[30rem]" />
      //       <div className="
      //       text-maplestory font-bold absolute
      //       top-10 text-sm
      //       xl:top-16 xl:text-base xl:left-5 
      //       tablet2560:top-8 tablet2560:left-11 tablet2560:text-3xl tablet2560:mt-20 
      //       ms-6 text-gray-600">{letter.date}</div>
      //       <div className="absolute 
      //       text-base bottom-3 w-full text-center font-maplestory 
      //       xl:bottom-6 xl:text-2xl
      //       tablet2560:bottom-12 tablet2560:text-4xl">
      //         {letter.title}
      //       </div>
      //     </div>
      //   ))}
      // </div>
      <div>선택한 동화의 편지 조회 api 연결 예정</div>
    );
  };

  // 뒤로가기 처리
  const handleBackButton = () => {
    if (selectedBookId) {
      setSelectedBook(null);
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="fixed inset-0 w-screen h-screen bg-cover bg-center" style={{ backgroundImage: `url(${mainpage})` }}>
      <BackButton onClick={handleBackButton} />
      <div className="flex justify-center items-center h-full">
        <div className="flex items-start gap-[4vw] tablet2560:gap-32">
          {/* Left Side - Letter List */}
          <div className="fixed left-[5vw] top-[12vh] w-[35vw]
           xl:left-60 tablet2560:left-80 xl:w-[25vw]
           tablet2560:top-50 tablet2560:w-[47vh]" >
            <img src={letterlist} alt="Letter List" className="tablet2560:mt-16 tablet2560:w-800px" />
            <div className="absolute top-0 left-0 
            pt-[10vh] tablet2560:pt-48 px-[7.5vh]
            w-full flex flex-col justify-center">
              <ul className="space-y-3 mt-2 tablet2560:space-y-7 xl:space-y-4 font-maplestory text-lg tablet2560:text-4xl xl:text-xl">
                {(letterBooks?.data?.book || []).map((book) => (  // totalLetterBooks 대신 letterBooks.book 사용
                  <li
                    key={book.book_id}
                    className={`flex items-center gap-2 tablet2560:gap-8 xl:gap-3 
                      ${selectedBookId === book.book_id ? "bg-[#ECD5AB] bg-opacity-90" : "bg-[#e9ddc3] bg-opacity-40"} 
                      rounded-lg p-2 tablet2560:p-5 cursor-pointer hover:bg-opacity-100 transition-all`}
                    onClick={() => setSelectedBook(book.book_id)}
                  >
                    <img
                      src={selectedBookId === book.book_id ? readletter : unreadletter}
                      alt="Letter"
                      className="w-[3vw] tablet2560:w-13"
                    />
                    <span className="font-bold">{book.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 오른쪽 영역 - 선택 안내 문구 or 편지 목록록 */}
          <div className="ml-[45vw] tablet2560:ml-[1000px] xl:ml-[35vw] mt-0 h-screen flex items-center">
            {renderRightContent()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LetterList;
