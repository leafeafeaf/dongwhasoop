import axios from "axios";
import {
  CreateChildRequest,
  ApiResponse,
  GetChildListApiResponse,
  UpdateChildRequest,
  UpdateChildProfileApiResponse,
  DeleteChildProfileApiResponse,
} from "../types/children";

export const createChildProfile = async (childData: CreateChildRequest) => {
  const accessToken = localStorage.getItem("accessToken");

  const response = await axios.post<ApiResponse<null>>(`${import.meta.env.VITE_API_BASE_URL}/children`, childData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const getChildProfiles = async () => {
  const accessToken = localStorage.getItem("accessToken");

  const response = await axios.get<GetChildListApiResponse>(`${import.meta.env.VITE_API_BASE_URL}/children`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
  return response.data.data.childList;
};

export const updateChildProfile = async (childId: number, updateData: UpdateChildRequest) => {
  const accessToken = localStorage.getItem("accessToken");

  const response = await axios.put<UpdateChildProfileApiResponse>(
    `${import.meta.env.VITE_API_BASE_URL}/children/${childId}`,
    updateData,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data.data;
};

export const deleteChildProfile = async (childId: number) => {
  const accessToken = localStorage.getItem("accessToken");

  const response = await axios.delete<DeleteChildProfileApiResponse>(
    `${import.meta.env.VITE_API_BASE_URL}/children/${childId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data.success;
};
