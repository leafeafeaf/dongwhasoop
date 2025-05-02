import { useMutation } from "@tanstack/react-query";
import { deleteUser } from "../api/authApi";

export const useDeleteUser = () => {
  return useMutation({
    mutationFn: (code: string) => deleteUser(code),

    onSuccess: () => {
      localStorage.clear();
    },
  });
};
