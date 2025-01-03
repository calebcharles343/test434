import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { useNavigate } from "react-router-dom";

import { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";
import { updateUserRole as updateUserRoleAPI } from "../../services/apiUser.ts";
import toast from "react-hot-toast";

interface ErrorResponse {
  message: string; // Assuming the error response has a 'message' field
  // Add any other properties that might be in the error response
}

interface LoginError extends AxiosError {
  response?: AxiosResponse<ErrorResponse>;
}

export function useUpdateUserRole(id: number) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const {
    mutate: UpdateUserRole,
    isPending,
    isError,
  } = useMutation({
    mutationFn: (data: { role: string }) => updateUserRoleAPI(id, data),

    onSuccess: (data) => {
      if (data.status === 200) {
        console.log(data.data);

        queryClient.invalidateQueries(["activeUser"] as any);
        toast.success("User role updated");
      } else if (data.status !== 200) {
        toast.error("User role update unsuccessfull");

        setErrorMessage(data.message);
        console.error("Error:", data.message); // Log error directly here
      }
    },

    onError: (err: LoginError) => {
      // Check if the error has a response, if so, display it
      toast.error("Error updating user role");

      const error = err.response?.data.message || "An error occurred";

      console.error("Error:", error);
      setErrorMessage(error); // Set the error message to display
    },
  });

  return { UpdateUserRole, isPending, isError, errorMessage };
}
