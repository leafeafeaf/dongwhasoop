import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { refreshAccessToken } from "../api/authApi";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 시 accessToken 자동 추가
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 응답에서 401이면 refresh → 토큰 저장 → 재요청
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) throw new Error("No refreshToken");

        const tokenResponse = await refreshAccessToken(refreshToken);
        localStorage.setItem("accessToken", tokenResponse.accessToken);
        localStorage.setItem("refreshToken", tokenResponse.refreshToken);

        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${tokenResponse.accessToken}`,
        };

        return api(originalRequest);
      } catch (err) {
        console.error("토큰 재발급 실패", err);
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;

// import axios from "axios";

// // 기본 axios 인스턴스 생성
// const axiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // 요청(Request) 보내기 전에 accessToken 붙이기
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const accessToken = localStorage.getItem("accessToken");
//     if (accessToken) {
//       config.headers.Authorization = `Bearer ${accessToken}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // 응답(Response) 받을 때 401 Unauthorized 처리
// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config;

//     // 401 에러 && 재시도한 요청이 아닌 경우
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true; // 재시도 막기 플래그

//       try {
//         const refreshToken = localStorage.getItem("refreshToken");

//         // 리프레시 토큰으로 accessToken 재발급 요청
//         const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/credentials/reissue`, {
//           refreshToken,
//         });

//         const newAccessToken = response.data.data.accessToken;
//         localStorage.setItem("accessToken", newAccessToken);

//         // 새 accessToken으로 원래 요청 재시도
//         originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//         return axiosInstance(originalRequest);
//       } catch (refreshError) {
//         console.error("토큰 재발급 실패:", refreshError);

//         // refreshToken도 만료됐으면 강제 로그아웃
//         localStorage.removeItem("accessToken");
//         localStorage.removeItem("refreshToken");
//         window.location.href = "/login"; // 로그인 페이지로 보내기
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;
