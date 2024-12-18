import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";
import { createReview as createReviewApi } from "../../services/apiReview.ts";
import { ReviewType } from "../../interfaces.ts";

interface ErrorResponse {
  message: string;
}

interface LoginError extends AxiosError<ErrorResponse> {}

export function useCreateReview(productId: number) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const {
    mutate: createReview,
    isPending,
    isError,
  } = useMutation<AxiosResponse<any>, LoginError, ReviewType>({
    mutationFn: (data: ReviewType) => createReviewApi(productId, data),

    onSuccess: (response) => {
      if (response.status === 200) {
        console.log(response.data);
        // Invalidate the cache for the specific product reviews
        queryClient.invalidateQueries([`Reviews-${productId}`] as any);
      } else {
        const errorMessage = response.data?.message || "Unexpected error";
        setErrorMessage(errorMessage);
        console.error("Review Creation Error:", errorMessage);
      }
    },

    onError: (error) => {
      const errorMessage = error.response?.data?.message || "An error occurred";
      console.error("Review Creation Error:", errorMessage);
      setErrorMessage(errorMessage);
    },
  });

  return { createReview, isPending, isError, errorMessage };
}
