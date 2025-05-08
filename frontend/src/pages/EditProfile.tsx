import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// 백엔드 API 함수
// import { getChildProfiles, createChildProfile, updateChildProfile } from "../api/children";

import mainpage from "../assets/images/mainpage/mainpage.webp";
import Pencil from "../assets/images/eidtprofile/pencil.webp";
import PlusBtn from "../assets/images/eidtprofile/plus.webp";
import cat from "../assets/images/settingpage/cat.webp";
import dog from "../assets/images/settingpage/dog.webp";
import bear from "../assets/images/settingpage/bear.webp";
import chik from "../assets/images/settingpage/chik.webp";
import panda from "../assets/images/settingpage/panda.webp";
import BackButton from "../components/commons/BackButton";

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

// 상단에 state 추가
function EditProfile() {
  const navigate = useNavigate();
  const [children, setChildren] = useState<ChildProfile[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingChild, setEditingChild] = useState<ChildProfile | null>(null);
  const [showCharacterSelect, setShowCharacterSelect] = useState(false);

  useEffect(() => {
    // fetchChildren();
    // 더미 데이터
    setChildren([
      { childId: 1, childName: "정해인", mascotId: 1 },
      { childId: 2, childName: "최우식", mascotId: 2 },
      { childId: 3, childName: "편민준", mascotId: 4 },
    ]);
  }, []);

  // handleEdit function modification
  const handleEdit = (child: ChildProfile) => {
    navigate(`/editingprofile/${child.childId}`);
  };

  const getCharacterImage = (mascotId: number) => mascotImageMap[mascotMap[mascotId]];

  return (
    <div
      className="font-bazzi fixed inset-0 w-screen h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${mainpage})` }}
    >
      <BackButton to={`/settings`} />

      <div className="flex flex-col pt-[14vh] tablet2560:pt-[18vh] items-center">
        <h1 className="text-[9vh] text-outline-sm tablet2560:text-9xl text-center pt-[7vh] pb-[10vh]">
          자녀 정보를 수정하거나 추가할 수 있어요
        </h1>
        <div className="flex justify-center gap-[16vh] tablet2560:gap-[10vh]">
          {children.map((child) => (
            <div
              key={child.childId}
              onClick={() => handleEdit(child)}
              className="relative flex flex-col items-center cursor-pointer hover:scale-105 transition-transform"
            >
              <img
                src={getCharacterImage(child.mascotId)}
                alt={child.childName}
                className="w-[24vh] h-[24vh] rounded-full"
              />
              <p className="text-[5vh] pt-2">{child.childName}</p>
              <img src={Pencil} alt="수정" className="absolute top-[15vh] left-[16vh] w-[9vh]" />
            </div>
          ))}
          <button onClick={() => navigate("/addingprofile")} className="hover:scale-110 transition-transform">
            <img src={PlusBtn} alt="자녀 추가" className="w-[24vh] h-[24vh]" />
            <p className="text-[5vh] pt-2">추가하기</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
