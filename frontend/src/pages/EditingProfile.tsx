import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import mainpage from "../assets/images/mainpage/mainpage.webp";
import treeBox from "../assets/images/settingpage/treebox.webp";
import DeleteBtn from "../assets/images/settingpage/deletebtn.webp";
import EditBtn from "../assets/images/settingpage/editbtn.webp";
import BackButton from "../components/commons/BackButton";
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

function EditingProfile() {
  const navigate = useNavigate();
  const { childId } = useParams();
  const [showCharacterSelect, setShowCharacterSelect] = useState(false);
  const [editingChild, setEditingChild] = useState<ChildProfile>({ childId: 0, childName: "", mascotId: 1 });

  useEffect(() => {
    // Fetch child data using childId
    // For now using dummy data
    if (childId) {
      setEditingChild({ childId: parseInt(childId), childName: "정해인", mascotId: 1 });
    }
  }, [childId]);

  const handleSave = async () => {
    if (!editingChild.childName) {
      alert("이름을 입력해주세요");
      return;
    }
    // Save logic here

    navigate("/editprofile");
  };

  const handleDelete = () => {
    // Delete logic here
    navigate("/editprofile");
  };

  const getCharacterImage = (mascotId: number) => mascotImageMap[mascotMap[mascotId]];

  return (
    <div
      className="font-bazzi fixed inset-0 w-screen h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${mainpage})` }}
    >
      <BackButton to="/editprofile" />

      <div className="flex items-center justify-center h-full">
        <div className="relative flex flex-col items-center">
          <img
            src={treeBox}
            alt="나무 안내판"
            className="w-[30vw] xl:w-[30vw] xl:max-w-[900px] tablet2560:w-[35vw] tablet2560:max-w-[900px] h-auto"
          />

          {/* 캐릭터 선택 */}
          <div className="absolute flex flex-col items-center mt-[14vh]">
            <button onClick={() => setShowCharacterSelect(true)} className="hover:scale-105">
              <img
                src={getCharacterImage(editingChild.mascotId)}
                alt="캐릭터"
                className="w-[17vw] max-w-[600px] h-auto tablet2560:w-[22vw] xl:max-w-[900px] tablet2560:w-[26vw] tablet2560:max-w-[900px] rounded-full"
              />
            </button>
          </div>

          {/* 이름 입력 */}
          <div className="absolute xl:mt-[57vh] tablet2560:mt-[35vw] mt-[26vw]">
            <input
              type="text"
              value={editingChild.childName}
              onChange={(e) => setEditingChild((prev) => ({ ...prev, childName: e.target.value }))}
              placeholder="이름을 입력해주세요"
              className="w-[23vw] placeholder-black max-w-[600px] h-[5vw] rounded-full px-[3vh] py-4 text-center text-3xl bg-[#fff4d3b8] font-maplestory tablet2560:w-[90vw] tablet2560:max-w-[550px] tablet2560:text-5xl"
            />
          </div>
        </div>

        {/* 저장, 삭제 버튼 */}
        <div className="flex flex-col absolute right-[10vw] gap-[7vh]">
          <button onClick={handleSave}>
            <img src={EditBtn} alt="저장하기" className="w-[16vw] max-w-[600px]" />
          </button>
          <button onClick={handleDelete}>
            <img src={DeleteBtn} alt="삭제하기" className="w-[16vw] max-w-[600px]" />
          </button>
        </div>
      </div>

      {/* 캐릭터 선택 모달 */}
      {showCharacterSelect && (
        <div className="fixed inset-0 bg-gray-800/50 flex items-center justify-center z-[999]">
          <div className="w-[80vw] h-[80vh] p-8 flex flex-col items-center justify-center rounded-3xl">
            <h2 className="text-[10vh] text-outline-sm font-bazzi pb-8">캐릭터를 선택해주세요</h2>
            <div className="grid grid-cols-3 gap-20 place-items-center">
              {[
                { id: "cat", img: cat, mascotId: 1 },
                { id: "dog", img: dog, mascotId: 2 },
                { id: "bear", img: bear, mascotId: 3 },
                { id: "chik", img: chik, mascotId: 4 },
                { id: "panda", img: panda, mascotId: 5 },
              ].map(({ id, img, mascotId }) => (
                <button
                  key={id}
                  onClick={() => {
                    setEditingChild((prev) => ({ ...prev, mascotId: mascotId }));
                    setShowCharacterSelect(false);
                  }}
                  className="hover:scale-110"
                >
                  <img src={img} alt={id} className="w-[20vh] h-[20vh] rounded-full" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditingProfile;
