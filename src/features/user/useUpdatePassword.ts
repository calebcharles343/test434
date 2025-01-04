import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { useNavigate } from "react-router-dom";

import { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";
import { updatePassword as updatePasswordAPI } from "../../services/apiUser.ts";
import toast from "react-hot-toast";
import { UpdatePasswordType } from "../../interfaces.ts";

interface ErrorResponse {
  message: string; // Assuming the error response has a 'message' field
  // Add any other properties that might be in the error response
}

interface LoginError extends AxiosError {
  response?: AxiosResponse<ErrorResponse>;
}

export function UpdatePassword() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const {
    mutate: updatePassword,
    isPending,
    isError,
  } = useMutation({
    mutationFn: (data: UpdatePasswordType) => updatePasswordAPI(data),

    onSuccess: (data) => {
      if (data.status === 200) {
        console.log(data.data);

        queryClient.invalidateQueries(["activeUser"] as any);
        toast.success("Password updated");
      } else if (data.status !== 200) {
        toast.error("Password update unsuccessfull");

        setErrorMessage(data.message);
        console.error("Error:", data.message); // Log error directly here
      }
    },

    onError: (err: LoginError) => {
      // Check if the error has a response, if so, display it
      toast.error("Error updating Password");

      const error = err.response?.data.message || "An error occurred";

      console.error("Error:", error);
      setErrorMessage(error); // Set the error message to display
    },
  });

  return { updatePassword, isPending, isError, errorMessage };
}
