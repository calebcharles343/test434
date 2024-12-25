import { useMutation } from "@tanstack/react-query";
// import { useNavigate } from "react-router-dom";
import { forgotPassword as forgotPasswordApi } from "../../services/apiAuth.ts";
import { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-hot-toast";
import { PasswordForgotTypes } from "../../interfaces.ts";

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

interface UseforgotPasswordType {
  data: PasswordForgotTypes;
}

interface LoginError extends AxiosError {
  response?: AxiosResponse<ErrorResponse>;
}

export function useforgotPassword() {
  // const navigate = useNavigate();

  const {
    mutate: forgotPassword,
    isPending,
    isError,
  } = useMutation({
    mutationFn: ({ data }: UseforgotPasswordType) => forgotPasswordApi(data),

    onSuccess: (data) => {
      if (data.status === 200) {
        // const userData = data.data.user;

        toast.success("Successfull! please check your mail.");
        // Navigate to home page after successful login
        // navigate("/login", { replace: true });
      } else {
        toast.error(`${data.message}`);

        console.error("forgotPassword Error:", data.message);
      }
    },

    onError: (err: LoginError) => {
      toast.error(`${err.response?.data.message}` || "An error occurred");

      const error = err.response?.data.message;
      console.error("forgotPassword Error:", error);
    },
  });

  return { forgotPassword, isPending, isError };
}
