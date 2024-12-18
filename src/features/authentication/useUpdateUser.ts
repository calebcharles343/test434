import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { UpdateUserType } from "../../interfaces.ts";
import { updateUser as updateUserApi } from "../../services/apiAuth.ts"; // Import the API function

interface ErrorResponse {
  message: string;
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const {
    mutate: updateUser,
    isPending: isUpdatingUser,
    isError,
    error,
  } = useMutation({
    mutationFn: async ({
      userId,
      data,
    }: {
      userId: number;
      data: UpdateUserType;
    }) => {
      const response = await updateUserApi(userId, data);
      return response;
    },
    onSuccess: (updatedUser) => {
      // Update the user data in React Query cache
      queryClient.setQueryData(["user"], updatedUser);
      queryClient.invalidateQueries(["user"] as any);
    },
    onError: (err: AxiosError<ErrorResponse>) => {
      console.error(
        "Update User Error:",
        err.response?.data?.message || err.message
      );
    },
  });

  return { updateUser, isUpdatingUser, isError, error };
}
