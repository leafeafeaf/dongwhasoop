import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../api/authApi";
import { RegisterUserRequest } from "../types/auth";

export const useRegisterUser = (idToken: string) => {
  return useMutation({
    mutationFn: (formData: RegisterUserRequest) => registerUser(idToken, formData),
  });
};
