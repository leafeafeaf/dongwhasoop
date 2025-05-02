import { useMutation } from "@tanstack/react-query";
import { login } from "../api/authApi";
import { LoginApiResponse } from "../types/auth";

export const useLogin = () => {
  return useMutation({
    mutationFn: (idToken: string) => login(idToken),

    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
    },

    onError: (error) => {
      console.error("로그인 실패: ", error);
    },
  });
};
