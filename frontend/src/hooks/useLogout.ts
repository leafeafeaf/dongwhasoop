import { useMutation } from "@tanstack/react-query";
import { logout } from "../api/authApi";

// 로그아웃
export const useLogout = () => {
  return useMutation({
    mutationFn: logout,

    onSuccess: () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
  });
};
