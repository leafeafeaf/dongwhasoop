// import { useNavigate } from "react-router-dom";

import booklistbackground from "../assets/images/booklist/booklistbackground.webp";
import BackButton from "../components/commons/BackButton";

function BookList() {
  // const navigate = useNavigate();

  return (
    <div
      className="fixed inset-0 w-screen h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${booklistbackground})` }}
    >
      <BackButton />
      <h1>이 곳은 북 리스트 페이지입니다.</h1>
    </div>
  );
}

export default BookList;
