import { useNavigate } from "react-router-dom";
import BackIcon from "../../assets/buttons/backicon.webp";

interface BackButtonProps {
  to?: string | number; // 혹은 NavigateOptions 타입도 OK
  className?: string;
}

function BackButton({ to, className = "" }: BackButtonProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (typeof to === "string" || typeof to === "number") {
      navigate(to);
    } else {
      navigate(-1); // 기본 뒤로가기
    }
  };

  return (
    <button onClick={handleClick} className={`absolute z-[10] ${className}`}>
      <img src={BackIcon} alt="뒤로가기" className="w-[15vh] h-[15vh] mt-[5vh] ml-[5vh]" />
    </button>
  );
}

export default BackButton;
