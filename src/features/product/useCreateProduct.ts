import { useMutation, useQueryClient } from "@tanstack/react-query";

import { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";
import { createProduct as createProductApi } from "../../services/apiProducts.ts";
import { ProductType } from "../../interfaces.ts";
import toast from "react-hot-toast";

interface ErrorResponse {
  message: string; // Assuming the error response has a 'message' field
}

interface LoginError extends AxiosError {
  response?: AxiosResponse<ErrorResponse>;
}

export function useCreateProduct() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const queryClient = useQueryClient();
  // const navigate = useNavigate();

  const {
    mutate: createProduct,
    isPending,
    isError,
  } = useMutation({
    mutationFn: (data: Partial<ProductType>) => createProductApi(data),

    onSuccess: (data) => {
      if (data.status === 201) {
        console.log(data.data);

        queryClient.invalidateQueries(["products"] as any);

        toast.success("Product added successfully");
      } else if (data.status !== 201) {
        setErrorMessage(data.message);
        toast.error("Error adding Product");
      }
    },

    onError: (err: LoginError) => {
      // Check if the error has a response, if so, display it
      const error = err.response?.data.message || "An error occurred";

      console.error("Login Error:", error);
      setErrorMessage(error); // Set the error message to display
    },
  });

  return { createProduct, isPending, isError, errorMessage };
}
