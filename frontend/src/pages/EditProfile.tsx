import BackButton from "../components/commons/BackButton";
import mainpage from "../assets/images/mainpage/mainpage.webp";

function EditProfile() {
  return (
    <div className="fixed inset-0 w-screen h-screen bg-cover bg-center" style={{ backgroundImage: `url(${mainpage})` }}>
      <BackButton to="/settings"></BackButton>

      <h1 className="text-[10vh] font-bazzi text-black-600 text-center text-outline-sm">
        이 곳은 자녀 추가 수정하는 페이지입니다.
      </h1>
    </div>
  );
}

export default EditProfile;
