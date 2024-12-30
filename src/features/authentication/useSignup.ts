import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { signup as signupApi } from "../../services/apiAuth.ts";
import { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";

interface SignupT {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface ErrorResponse {
  message: string; // Assuming the error response has a 'message' field
  // Add any other properties that might be in the error response
}

interface LoginError extends AxiosError {
  response?: AxiosResponse<ErrorResponse>;
}

export function useSignup() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    mutate: signup,
    isPending,
    isError,
  } = useMutation({
    mutationFn: ({ name, email, password, confirmPassword }: SignupT) =>
      signupApi(name, email, password, confirmPassword),

    onSuccess: (data) => {
      if (data.status === 201) {
        const userData = data.data.user;

        // Clear React Query cache and reset headers
        queryClient.clear();

        // Set JWT token in cookies
        Cookies.set(`token-${userData.id}`, data.data.token, {
          expires: 7,
          secure: true,
          sameSite: "strict",
        });

        // Set current user in sessionStorage
        sessionStorage.setItem("currentSessionUser", JSON.stringify(userData));
        sessionStorage.setItem(`token-${userData.id}`, data.data.token);

        // Redirect to the home page
        navigate("/home", { replace: true });
      } else {
        toast.error(`${data.message}`);

        console.error("Login Error:", data.message);
      }
    },

    onError: (err: LoginError) => {
      toast.error(`${err.response?.data.message}` || "An error occurred");

      const error = err.response?.data.message;
      console.error("Login Error:", error);
    },
  });

  return { signup, isPending, isError };
}
