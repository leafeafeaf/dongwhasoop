import axios from "axios";
import { Book, GetBookListResponse } from "../types/letter";
import { useSelectedChild } from "../stores/useSelectedChild";

// 편지함 조회
export const getLetterBookList = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const selectedChild = useSelectedChild.getState().selectedChild;
    console.log("선택된 자녀 id:", selectedChild?.childId)

    if (!selectedChild) {
        throw new Error("선택된 자녀가 없습니다.");
      }

    const response = await axios.get<GetBookListResponse>(
      `${import.meta.env.VITE_API_BASE_URL}/letterboxes/${selectedChild.childId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("편지함 조회 결과:", response.data.data);
    return response.data.data;
  };

