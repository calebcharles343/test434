import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { createProduct as createProductApi } from "../../services/apiProducts.ts";
import { ProductType } from "../../interfaces.ts";
import toast from "react-hot-toast";

interface ErrorResponse {
  message: string;
}

interface LoginError extends AxiosError {
  response?: AxiosResponse<ErrorResponse>;
}

export function useCreateProduct() {
  const queryClient = useQueryClient();

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
        toast.error("Error adding Product");
      }
    },

    onError: (err: LoginError) => {
      const error = err.response?.data.message || "An error occurred";

      console.error("Login Error:", error);
    },
  });

  return { createProduct, isPending, isError };
}
