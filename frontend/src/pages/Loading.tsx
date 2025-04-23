import mainpage from "../assets/images/mainpage/mainpage.webp";

function Loading() {
  return (
    <div className="fixed inset-0 w-screen h-screen bg-cover bg-center" style={{ backgroundImage: `url(${mainpage})` }}>
      <h1>로딩 화면입니다.</h1>
    </div>
  );
}

export default Loading;
