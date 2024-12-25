import { useMutation } from "@tanstack/react-query";
// import { useNavigate } from "react-router-dom";
import { resetPassword as resetPasswordApi } from "../../services/apiAuth.ts";
import { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-hot-toast";
import { PasswordResetTypes } from "../../interfaces.ts";

// interface Sig {
//   name: string;
//   email: string;
//   password: string;
//   confirmPassword: string;
// }

interface ErrorResponse {
  message: string; // Assuming the error response has a 'message' field
  // Add any other properties that might be in the error response
}

interface UseResetPasswordType {
  data: PasswordResetTypes;
}

interface LoginError extends AxiosError {
  response?: AxiosResponse<ErrorResponse>;
}

export function useResetPassword(token: string) {
  // const navigate = useNavigate();

  const {
    mutate: resetPassword,
    isPending,
    isError,
  } = useMutation({
    mutationFn: ({ data }: UseResetPasswordType) =>
      resetPasswordApi(token, data),

    onSuccess: (data) => {
      if (data.status === 200) {
        // const userData = data.data.user;

        toast.success("Password reset successfull");
        // Navigate to home page after successful login
        // navigate("/login", { replace: true });
      } else {
        toast.error(`${data.message}`);

        console.error("resetPassword Error:", data.message);
      }
    },

    onError: (err: LoginError) => {
      toast.error(`${err.response?.data.message}` || "An error occurred");

      const error = err.response?.data.message;
      console.error("resetPassword Error:", error);
    },
  });

  return { resetPassword, isPending, isError };
}
