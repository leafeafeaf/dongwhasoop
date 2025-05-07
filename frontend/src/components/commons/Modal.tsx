import modal from "../../assets/images/loading/recalert.webp";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  type: 'back' | 'send' | 'loading' | 'selectvoice' | 'setting';
  showCancelButton?: boolean;  // New prop to control button display
}

const modalTexts = {
  back: "정말 뒤로 가나요?\n보고 있던 페이지로 돌아가지 못합니다.",
  send: "정말 편지를 보낼까요?\n편지는 수정할 수 없습니다",
  loading: "잠시만 기다려주세요.\n동화책을 만들고 있습니다.",
  selectvoice: "녹음하는 사람이 누군지 선택해주세요!",
  setting: "이름과 캐릭터를 선택해주세요!"
};

function Modal({ isOpen, onClose, onConfirm, type, showCancelButton = true }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      
      {/* Modal Content */}
      <div className="relative">
        <img src={modal} alt="modal background" className="max-w-[70vw]" />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-[4vw] font-bazzi text-center text-black text-outline-ss mb-8 whitespace-pre-line mt-[10vw]">
            {modalTexts[type]}
          </p>
          
          <div className={`flex ${showCancelButton ? 'gap-[7vw]' : ''} text-[3vw] pt-[3vw]`}>
            <button 
              onClick={onConfirm}
              className="px-[3vw] py-[2vw] bg-green-500/80 rounded-full text-white font-bazzi hover:bg-green-600/80"
            >
              확인
            </button>
            {showCancelButton && (
              <button 
                onClick={onClose}
                className="px-[3vw] py-[2vw] bg-red-500/80 rounded-full text-white font-bazzi hover:bg-red-600/80"
              >
                취소
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;