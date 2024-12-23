import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { useNavigate } from "react-router-dom";

import { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";
import { updateProduct as updateProductApi } from "../../services/apiProducts.ts";
import { ProductType } from "../../interfaces.ts";
import toast from "react-hot-toast";

interface ErrorResponse {
  message: string; // Assuming the error response has a 'message' field
  // Add any other properties that might be in the error response
}

interface LoginError extends AxiosError {
  response?: AxiosResponse<ErrorResponse>;
}

export function useUpdateProduct(id: number) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const queryClient = useQueryClient();
  // const navigate = useNavigate();

  const {
    mutate: updateProduct,
    isPending,
    isError,
  } = useMutation({
    mutationFn: (data: Partial<ProductType>) => updateProductApi(id, data),

    onSuccess: (data) => {
      if (data.status === 200) {
        queryClient.invalidateQueries(["products"] as any);
        toast.success("Product updated successfully");
      } else if (data.status !== 200) {
        toast.error("Product update not successfull");
        setErrorMessage(data.message);
        console.error("Login Error:", data.message); // Log error directly here
      }
    },

    onError: (err: LoginError) => {
      toast.error("Error updating Product");

      // Check if the error has a response, if so, display it
      const error = err.response?.data.message || "An error occurred";

      console.error("Login Error:", error);
      setErrorMessage(error); // Set the error message to display
    },
  });

  return { updateProduct, isPending, isError, errorMessage };
}
