import api from "../lib/axiosInstance";
import {
  CheckRegisteredApiResponse,
  RegisterUserResponse,
  RegisterUserRequest,
  LoginApiResponse,
  LogoutApiResponse,
  DeleteUserApiResponse,
  GetTokenApiResponse,
} from "../types/auth";

// 회원인지 아닌지 확인
export const CheckIsRegistered = async (code: string) => {
  const response = await api.get<CheckRegisteredApiResponse>("/credentials/oauth/valid/register", {
    params: {
      code,
      provider: "KAKAO",
    },
  });
  return response.data.data;
};

// 회원가입
export const registerUser = async (idToken: string, requestData: RegisterUserRequest) => {
  const response = await api.post<RegisterUserResponse>("/credentials", requestData, {
    headers: {
      Authorization: `Bearer ${idToken}`, // 로그인 전이라 accessToken은 없음
    },
    params: {
      idToken,
      provider: "KAKAO",
    },
  });
  return response.data.data;
};

// 로그인
export const login = async (idToken: string) => {
  const response = await api.post<LoginApiResponse>(
    "/credentials/login",
    {},
    {
      params: {
        idToken,
        provider: "KAKAO",
      },
    }
  );
  return response.data.data;
};

// 로그아웃
export const logout = async () => {
  const response = await api.post<LogoutApiResponse>("/credentials/logout", {});
  return response.data.success;
};

// 회원탈퇴
export const deleteUser = async (code: string) => {
  const response = await api.delete<DeleteUserApiResponse>("/credentials", {
    params: { code },
  });
  return response.data.success;
};

// refreshToken 재발급
export const refreshAccessToken = async (refreshToken: string) => {
  const response = await api.post<GetTokenApiResponse>("/credentials/refresh", { refreshToken });
  return response.data.data;
};

// import axios from "axios";
// import {
//   CheckRegisteredApiResponse,
//   RegisterUserResponse,
//   RegisterUserRequest,
//   LoginApiResponse,
//   LogoutApiResponse,
//   DeleteUserApiResponse,
//   GetTokenApiResponse,
// } from "../types/auth";

// // 회원인지 아닌지 확인
// export const CheckIsRegistered = async (code: string) => {
//   const response = await axios.get<CheckRegisteredApiResponse>(
//     `${import.meta.env.VITE_API_BASE_URL}/credentials/oauth/valid/register`,
//     {
//       params: {
//         code,
//         provider: "KAKAO",
//       },
//       headers: {
//         "Content-Type": "application/json",
//       },
//     }
//   );
//   return response.data.data;
// };

// // 회원가입
// export const registerUser = async (idToken: string, requestData: RegisterUserRequest) => {
//   const response = await axios.post<RegisterUserResponse>(
//     `${import.meta.env.VITE_API_BASE_URL}/credentials`,
//     requestData,
//     {
//       headers: {
//         Authorization: `Bearer ${idToken}`,
//         "Content-Type": "application/json",
//       },
//       params: {
//         idToken,
//         provider: "KAKAO",
//       },
//     }
//   );
//   return response.data.data;
// };

// // 로그인
// export const login = async (idToken: string) => {
//   const response = await axios.post<LoginApiResponse>(
//     `${import.meta.env.VITE_API_BASE_URL}/credentials/login`,
//     {},
//     {
//       headers: {
//         "Content-Type": "application/json",
//       },
//       params: {
//         idToken,
//         provider: "KAKAO",
//       },
//     }
//   );
//   return response.data.data;
// };

// // 로그아웃
// export const logout = async () => {
//   const accessToken = localStorage.getItem("accessToken");

//   const response = await axios.post<LogoutApiResponse>(
//     `${import.meta.env.VITE_API_BASE_URL}/credentials/logout`,
//     {},
//     {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//         "Content-Type": "application/json",
//       },
//     }
//   );
//   return response.data.success;
// };

// // 회원탈퇴
// export const deleteUser = async (code: string) => {
//   const accessToken = localStorage.getItem("accessToken");

//   const response = await axios.delete<DeleteUserApiResponse>(`${import.meta.env.VITE_API_BASE_URL}/credentials`, {
//     params: { code },
//     headers: {
//       Authorization: `Bearer ${accessToken}`,
//       "Content-Type": "application/json",
//     },
//   });
//   return response.data.success;
// };

// // refreshToken 재발급
// export const refreshAccessToken = async (refreshToken: string) => {
//   const accessToken = localStorage.getItem("accessToken");

//   const response = await axios.post<GetTokenApiResponse>(
//     `${import.meta.env.VITE_API_BASE_URL}/credentials/refresh`,
//     { refreshToken },
//     {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//         "Content-Type": "application/json",
//       },
//     }
//   );

//   return response.data.data;
// };
