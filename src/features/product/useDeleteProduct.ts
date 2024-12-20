import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { deleteProduct as deleteProductApi } from "../../services/apiProducts.ts";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

interface ErrorResponse {
  message: string;
}

interface FetchError extends AxiosError {
  response?: AxiosResponse<ErrorResponse>;
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    mutate: deleteProduct,
    isPending: isDeletingProduct,
    isError: isErrorDeletingProduct,
    error: errorDeletingProduct,
  } = useMutation<void, FetchError, number>({
    mutationFn: (id: number) => deleteProductApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["products"] as any);
      toast.success("Product deleted successfully");

      navigate("/home", { replace: true });
      // Invalidate and refetch products
    },
    onError: (error) => {
      toast.error("Error deleting Product");

      const errorMessage =
        error.response?.data.message ||
        "An error occurred while deleting the product.";
      console.error("Delete product Error:", errorMessage);
    },
  });

  return {
    deleteProduct,
    isDeletingProduct,
    isErrorDeletingProduct,
    errorDeletingProduct,
  };
}
