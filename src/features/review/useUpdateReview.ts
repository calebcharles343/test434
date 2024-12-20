import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { updateReview as updateReviewApi } from "../../services/apiReview.ts";
import { ReviewType } from "../../interfaces.ts";
import toast from "react-hot-toast";

interface ErrorResponse {
  message: string;
}

interface FetchError extends AxiosError {
  response?: AxiosResponse<ErrorResponse>;
}

interface UpdateReviewParams {
  reviewId: number;
  data: ReviewType;
}

export function useUpdateReview(productId: number) {
  const queryClient = useQueryClient();

  const {
    mutate: UpdateReview,
    isPending: isUpdatingReview, // Correct property name for loading state
    isError: isErrorUpdatingReview,
    error: errorUpdatingReview,
  } = useMutation<void, FetchError, UpdateReviewParams>({
    mutationFn: ({ reviewId, data }: UpdateReviewParams) =>
      updateReviewApi(productId, reviewId, data),
    onSuccess: () => {
      toast.success("Review created");
      queryClient.invalidateQueries([`Reviews-${productId}`] as any);
    },
    onError: (error) => {
      toast.error("Error Updating review");

      const errorMessage =
        error.response?.data.message ||
        "An error occurred while updating the review.";
      console.error("Update review error:", errorMessage);
    },
  });

  return {
    UpdateReview,
    isUpdatingReview,
    isErrorUpdatingReview,
    errorUpdatingReview,
  };
}
