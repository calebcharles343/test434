import { useMutation, useQueryClient } from "@tanstack/react-query";

import { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";
import { createOrder as createOrderApi } from "../../services/apiOrder.ts";
import { OrderType } from "../../interfaces.ts";
import toast from "react-hot-toast";

interface ErrorResponse {
  message: string; // Assuming the error response has a 'message' field
}

interface LoginError extends AxiosError {
  response?: AxiosResponse<ErrorResponse>;
}

export function useCreateOrder() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const queryClient = useQueryClient();
  // const navigate = useNavigate();
  const {
    mutate: createOrder,
    isPending,
    isError,
  } = useMutation({
    mutationFn: (data: OrderType) => createOrderApi(data),

    onSuccess: (data) => {
      if (data.status === 201) {
        console.log(data.data);

        queryClient.invalidateQueries(["orders"] as any);

        toast.success("Order added successfully");
      } else if (data.status !== 201) {
        setErrorMessage(data.message);
        toast.error("Error adding Order");
      }
    },

    onError: (err: LoginError) => {
      // Check if the error has a response, if so, display it
      const error = err.response?.data.message || "An error occurred";

      console.error("Order Error:", error);
      setErrorMessage(error); // Set the error message to display
    },
  });

  return { createOrder, isPending, isError, errorMessage };
}
