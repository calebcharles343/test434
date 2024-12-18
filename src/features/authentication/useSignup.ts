import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { signup as signupApi } from "../../services/apiAuth.ts";
import { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";

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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
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
      if (data.status === 200) {
        // Assuming 'data' has 'data.user' and 'data.token'
        console.log(data.data.token);

        // Cache user data in React Query
        queryClient.setQueryData(["user"], data.data.user);

        // Store JWT token in cookies
        Cookies.set("jwt", data.data.token, {
          expires: 7,
          secure: true, // Only send the cookie over HTTPS
          sameSite: "strict",
        });

        // Navigate to home page after successful login
        navigate("/home", { replace: true });
      } else if (data.status !== 200) {
        console.log(data.message);

        setErrorMessage(data.message);
        console.error("Login Error:", data.message); // Log error directly here
      }
    },

    onError: (err: LoginError) => {
      // Check if the error has a response, if so, display it
      const error = err.response?.data.message || "An error occurred";
      console.error("Login Error:", error);
      setErrorMessage(error); // Set the error message to display
    },
  });

  return { signup, isPending, isError, errorMessage };
}
