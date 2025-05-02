import axios from "axios";
import { GetBookListApiResponse, GetSongApiResponse } from "../types/book";

export const getBookList = async () => {
    const accessToken = localStorage.getItem("accessToken");

    const response = await axios.get<GetBookListApiResponse>(`${import.meta.env.VITE_API_BASE_URL}/books`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
    });
    return response.data.data; //여기 data 필요에 따라 수정 필요
}

export const getSong = async (bookId: number) => {
    const accessToken = localStorage.getItem("accessToken");

    const response = await axios.get<GetSongApiResponse>(`${import.meta.env.VITE_API_BASE_URL}/books/${bookId}/song`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
    });
    return response.data.data.songUrl;  
}