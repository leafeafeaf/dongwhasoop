import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>어떤 친구가 오늘의 주인공이 될까요?</h1>
      <button onClick={() => navigate("/home")}>정해인</button>
      <button onClick={() => navigate("/home")}>최우식</button>
      <button onClick={() => navigate("/home")}>편민준</button>
    </div>
  );
}

export default Profile;
