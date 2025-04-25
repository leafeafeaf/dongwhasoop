import { useNavigate } from "react-router-dom";
import BackIcon from "../../assets/buttons/backicon.webp";

interface BackButtonProps {
  to?: string;
  className?: string;
}

function BackButton({ to, className = "" }: BackButtonProps) {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate(to ?? -1)} className={`absolute ${className}`}>
      <img src={BackIcon} alt="뒤로가기" className="w-[15vh] h-[15vh] mt-[5vh] ml-[5vh]" />
    </button>
  );
}

export default BackButton;
