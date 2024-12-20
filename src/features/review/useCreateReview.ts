import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { createReview as createReviewApi } from "../../services/apiReview.ts";
import { ReviewType } from "../../interfaces.ts";
import toast from "react-hot-toast";

interface ErrorResponse {
  message: string;
}

interface LoginError extends AxiosError<ErrorResponse> {}

export function useCreateReview(productId: number) {
  const queryClient = useQueryClient();

  const {
    mutate: createReview,
    isPending,
    isError,
  } = useMutation<AxiosResponse<any>, LoginError, ReviewType>({
    mutationFn: (data: ReviewType) => createReviewApi(productId, data),

    onSuccess: (response) => {
      if (response.status === 201) {
        console.log(response.data);
        // Invalidate the cache for the specific product reviews
        toast.success("Thank you for your feedback");

        queryClient.invalidateQueries([`Reviews-${productId}`] as any);
      } else {
        toast.error("Review not successful");
      }
    },

    onError: (error) => {
      toast.error("Review Error");

      const errorMessage = error.response?.data?.message || "An error occurred";
      console.error("Review Creation Error:", errorMessage);
    },
  });

  return { createReview, isPending, isError };
}
