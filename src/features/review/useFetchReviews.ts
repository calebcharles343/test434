import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ReviewType } from "../../interfaces.ts";
import { getAllReviews } from "../../services/apiReview.ts";

interface ErrorResponse {
  message: string;
}
export interface UseFetchReviewsPropd {
  status: number;
  message: string;
  amount: number;
  data: ReviewType[]; // Ensure `data` is an array of `ReviewType`
}

interface FetchError extends AxiosError<ErrorResponse> {}

export function useFetchReviews(productId: number) {
  const {
    data: reviews,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<UseFetchReviewsPropd, FetchError>({
    queryKey: ["Reviews", productId], // Include productId to scope queries
    queryFn: () => getAllReviews(productId), // Pass a function instead of calling it directly
  });

  // Log errors
  if (isError && error) {
    const errorMessage =
      error.response?.data.message ||
      "An error occurred while fetching reviews.";
    console.error("Fetch Reviews Error:", errorMessage);
  }

  return {
    reviews,
    isLoading,
    isError,
    error,
    refetch,
  };
}
