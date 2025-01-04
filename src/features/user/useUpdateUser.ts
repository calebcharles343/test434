import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

import { updateUser as updateUserApi } from "../../services/apiUser.ts"; // Import the API function
import toast from "react-hot-toast";

interface ErrorResponse {
  message: string;
}

interface Error extends AxiosError {
  response?: AxiosResponse<ErrorResponse>;
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const {
    mutate: updateUser,
    isPending: isUpdatingUser,
    isError,
    error,
  } = useMutation({
    mutationFn: async (data: any) => {
      const response = await updateUserApi(data);
      return response;
    },

    onSuccess: (data) => {
      if (data.status === 200) {
        const userData = data.data;

        // Set current user in sessionStorage
        sessionStorage.setItem("currentSessionUser", JSON.stringify(userData));

        queryClient.invalidateQueries([`user`, userData.id] as any);

        toast.success("User name updated");
      } else if (data.status !== 200) {
        toast.error("User name update unsuccessfull");

        console.error("Error:", data.message); // Log error directly here
      }
    },

    onError: (err: Error) => {
      // Check if the error has a response, if so, display it
      toast.error("Error updating user name");

      const error = err.response?.data.message || "An error occurred";

      console.error("Error:", error);
    },
  });

  return { updateUser, isUpdatingUser, isError, error };
}
