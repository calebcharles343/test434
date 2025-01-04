import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";
import { cancelOrder as cancelOrderStatusAPI } from "../../services/apiOrder.ts";
import toast from "react-hot-toast";

interface ErrorResponse {
  message: string;
}

interface LoginError extends AxiosError {
  response?: AxiosResponse<ErrorResponse>;
}

export function useCancelOrder(id: number) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const queryClient = useQueryClient();

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
        console.error("cancelling Error:", data.message);
      }
    },

    onError: (err: LoginError) => {
      toast.error("Error cancelling Order");

      const error = err.response?.data.message || "An error occurred";

      console.error("cancelling Error:", error);
      setErrorMessage(error);
    },
  });

  return { cancelOrder, isPending, isError, errorMessage };
}
