import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// 백엔드 API 함수
// import { getChildProfiles, createChildProfile, updateChildProfile } from "../api/children";

import mainpage from "../assets/images/mainpage/mainpage.webp";
import CompleteBtn from "../assets/images/eidtprofile/complete.webp";
import Pencil from "../assets/images/eidtprofile/pencil.webp";
import PlusBtn from "../assets/images/eidtprofile/plus.webp";
import cat from "../assets/images/settingpage/cat.webp";
import dog from "../assets/images/settingpage/dog.webp";
import bear from "../assets/images/settingpage/bear.webp";
import chik from "../assets/images/settingpage/chik.webp";
import panda from "../assets/images/settingpage/panda.webp";

interface ChildProfile {
  childId: number;
  childName: string;
  mascotId: number;
}

const mascotMap: Record<number, string> = {
  1: "cat",
  2: "dog",
  3: "bear",
  4: "chik",
  5: "panda",
};

const mascotImageMap: Record<string, string> = {
  cat,
  dog,
  bear,
  chik,
  panda,
};

function EditProfile() {
  const navigate = useNavigate();
  const [children, setChildren] = useState<ChildProfile[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingChild, setEditingChild] = useState<ChildProfile | null>(null);
  // const [showCharacterSelect, setShowCharacterSelect] = useState(false);

  useEffect(() => {
    // fetchChildren();
    // 더미 데이터
    setChildren([
      { childId: 1, childName: "정해인", mascotId: 1 },
      { childId: 2, childName: "최우식", mascotId: 2 },
      { childId: 3, childName: "편민준", mascotId: 4 },
    ]);
  }, []);

  const handleEdit = (child: ChildProfile) => {
    setEditingChild(child);
    setIsEditing(true);
  };

  const handleAdd = () => {
    setEditingChild({ childId: 0, childName: "", mascotId: 1 });
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!editingChild?.childName) {
      alert("이름을 입력해주세요");
      return;
    }

    // if (editingChild.childId === 0) {
    //   await createChildProfile({ name: editingChild.childName, mascotId: editingChild.mascotId });
    // } else {
    //   await updateChildProfile(editingChild.childId, { name: editingChild.childName, mascotId: editingChild.mascotId });
    // }
    setIsEditing(false);
    setEditingChild(null);
  };

  const getCharacterImage = (mascotId: number) => mascotImageMap[mascotMap[mascotId]];

  return (
    <div
      className="font-bazzi fixed inset-0 w-screen h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${mainpage})` }}
    >
      <div className="flex flex-col pt-[12vh] items-center">
        <h1 className="text-[8vh] text-outline-sm text-center pb-[4vh]">자녀 정보를 수정하거나 추가할 수 있어요</h1>
        <div className="flex justify-center gap-10">
          {children.map((child) => (
            <div key={child.childId} className="relative flex flex-col items-center">
              <img
                src={getCharacterImage(child.mascotId)}
                alt={child.childName}
                className="w-[20vh] h-[20vh] rounded-full"
              />
              <p className="text-[5vh] pt-2">{child.childName}</p>
              <button onClick={() => handleEdit(child)} className="absolute top-0 right-0 w-[5vh]">
                <img src={Pencil} alt="수정" />
              </button>
            </div>
          ))}
          <button onClick={handleAdd} className="hover:scale-110 transition-transform">
            <img src={PlusBtn} alt="자녀 추가" className="w-[20vh] h-[20vh]" />
          </button>
        </div>
        <div className="pt-[6vh]">
          <button onClick={() => navigate("/profile")}>
            <img src={CompleteBtn} alt="완료" className="w-[16vh]" />
          </button>
        </div>
      </div>

      {/* 자녀 추가/수정 모달 */}
      {isEditing && editingChild && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[999]">
          <div className="relative w-[95vw] max-w-[1000px] h-[80vh] p-12 bg-white rounded-3xl text-black flex flex-col items-center justify-center">
            <input
              type="text"
              value={editingChild.childName}
              onChange={(e) => setEditingChild((prev) => (prev ? { ...prev, childName: e.target.value } : null))}
              placeholder="이름을 입력해주세요"
              className="w-[80%] text-center p-5 rounded-full text-[4vh] bg-[#fff4d3b8]"
            />
            <div className="flex gap-10 mt-10 flex-wrap justify-center">
              {["cat", "dog", "bear", "chik", "panda"].map((key, idx) => (
                <button
                  key={key}
                  onClick={() => setEditingChild((prev) => (prev ? { ...prev, mascotId: idx + 1 } : null))}
                >
                  <img
                    src={mascotImageMap[key]}
                    alt={key}
                    className={`w-[10vh] h-[10vh] rounded-full ${
                      editingChild.mascotId === idx + 1 ? "ring-4 ring-yellow-400" : ""
                    }`}
                  />
                </button>
              ))}
            </div>
            <button
              onClick={handleSave}
              className="mt-12 px-10 py-4 rounded-full bg-yellow-300 hover:bg-yellow-400 text-2xl"
            >
              저장하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditProfile;
