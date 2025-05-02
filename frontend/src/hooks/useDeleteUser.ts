import { useMutation } from "@tanstack/react-query";
import { deleteUser } from "../api/authApi";

// 회원 탈퇴
export const useDeleteUser = () => {
  return useMutation({
    mutationFn: (code: string) => deleteUser(code),

    onSuccess: () => {
      localStorage.clear();
    },
  });
};
