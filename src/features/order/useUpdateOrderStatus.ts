import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { useNavigate } from "react-router-dom";

import { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";
import { updateOrderStatus as updateOrderStatusAPI } from "../../services/apiOrder.ts";
import toast from "react-hot-toast";

interface ErrorResponse {
  message: string; // Assuming the error response has a 'message' field
  // Add any other properties that might be in the error response
}

interface LoginError extends AxiosError {
  response?: AxiosResponse<ErrorResponse>;
}

export function useUpdateOrderStatus(id: number) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const queryClient = useQueryClient();
  // const navigate = useNavigate();

  const {
    mutate: updateOrderStatus,
    isPending,
    isError,
  } = useMutation({
    mutationFn: (data: { status: string }) => updateOrderStatusAPI(id, data),

    onSuccess: (data) => {
      if (data.status === 200) {
        console.log(data.data);

        queryClient.invalidateQueries(["products"] as any);
        toast.success("Order status updated");
      } else if (data.status !== 200) {
        toast.error("Order status update unsuccessfull");

        setErrorMessage(data.message);
        console.error("Login Error:", data.message); // Log error directly here
      }
    },

    onError: (err: LoginError) => {
      // Check if the error has a response, if so, display it
      toast.error("Error updating Order status");

      const error = err.response?.data.message || "An error occurred";

      console.error("Login Error:", error);
      setErrorMessage(error); // Set the error message to display
    },
  });

  return { updateOrderStatus, isPending, isError, errorMessage };
}
