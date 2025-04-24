import mainpage from "../assets/images/mainpage/mainpage.webp";
import BackButton from "../components/commons/BackButton";

function MailDetail() {
  return (
    <div className="fixed inset-0 w-screen h-screen bg-cover bg-center" style={{ backgroundImage: `url(${mainpage})` }}>
      <BackButton to="/letterlist" />
      <h1>이 곳은 메일 상세 페이지입니다.</h1>
    </div>
  );
}

export default MailDetail;
