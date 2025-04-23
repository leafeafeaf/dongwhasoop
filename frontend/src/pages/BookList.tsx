import { useNavigate } from "react-router-dom";

import booklistbackground from "../assets/images/booklist/booklistbackground.webp";

function BookList() {
  const navigate = useNavigate();

  return (
    <div
      className="fixed inset-0 w-screen h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${booklistbackground})` }}
    >
      <button onClick={() => navigate(-1)}>뒤로 가기</button>
      <h1>이 곳은 북 리스트 페이지입니다.</h1>
    </div>
  );
}

export default BookList;
