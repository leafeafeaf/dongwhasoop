import { useMutation } from "@tanstack/react-query";
import { logout } from "../api/authApi";

export const useLogout = () => {
  return useMutation({
    mutationFn: logout,

    onSuccess: () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
  });
};
