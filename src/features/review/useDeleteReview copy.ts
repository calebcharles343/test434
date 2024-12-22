import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { deleteReview as deleteReviewApi } from "../../services/apiReview.ts";
import toast from "react-hot-toast";

interface ErrorResponse {
  message: string;
}

interface FetchError extends AxiosError {
  response?: AxiosResponse<ErrorResponse>;
}

export function useDeleteReview(productId: number) {
  const queryClient = useQueryClient();

  const {
    mutate: deleteReview,
    isPending: isDeletingReview,
    isError: isErrorDeletingReview,
    error: errorDeletingReview,
  } = useMutation<void, FetchError, number>({
    mutationFn: (reviewId: number) => deleteReviewApi(productId, reviewId),
    onSuccess: () => {
      queryClient.invalidateQueries([`Reviews-${productId}`] as any);
      toast.success("Review deleted successfully");
    },
    onError: (error) => {
      toast.error("Error deleting Review");

      const errorMessage =
        error.response?.data.message ||
        "An error occurred while deleting the product.";
      console.error("Delete product Error:", errorMessage);
    },
  });

  return {
    deleteReview,
    isDeletingReview,
    isErrorDeletingReview,
    errorDeletingReview,
  };
}
