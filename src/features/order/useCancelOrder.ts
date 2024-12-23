import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { useNavigate } from "react-router-dom";

import { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";
import { cancelOrder as cancelOrderStatusAPI } from "../../services/apiOrder.ts";
import toast from "react-hot-toast";

interface ErrorResponse {
  message: string; // Assuming the error response has a 'message' field
  // Add any other properties that might be in the error response
}

interface LoginError extends AxiosError {
  response?: AxiosResponse<ErrorResponse>;
}

export function useCancelOrder(id: number) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const queryClient = useQueryClient();
  // const navigate = useNavigate();

  const {
    mutate: cancelOrder,
    isPending,
    isError,
  } = useMutation({
    mutationFn: (data: { status: string }) => cancelOrderStatusAPI(id, data),

    onSuccess: (data) => {
      if (data.status === 200) {
        console.log(data.data);

        queryClient.invalidateQueries(["products"] as any);
        toast.success("Order cancelled");
      } else if (data.status !== 200) {
        toast.error("Order cancellation unsuccessfull");

        setErrorMessage(data.message);
        console.error("cancelling Error:", data.message); // Log error directly here
      }
    },

    onError: (err: LoginError) => {
      // Check if the error has a response, if so, display it
      toast.error("Error cancelling Order");

      const error = err.response?.data.message || "An error occurred";

      console.error("cancelling Error:", error);
      setErrorMessage(error); // Set the error message to display
    },
  });

  return { cancelOrder, isPending, isError, errorMessage };
}
