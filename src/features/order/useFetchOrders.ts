import { useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { OrdersType } from "../../interfaces.ts";
import { getAllOrders } from "../../services/apiOrder.ts";

interface ErrorResponse {
  message: string;
}
interface UseFetchOrdersType {
  data: OrdersType;
}

interface FetchError extends AxiosError {
  response?: AxiosResponse<ErrorResponse>;
}

export function useFetchOrders(user1d: number) {
  const {
    data: orders,
    isLoading: isLoadingOrders,
    isError: isErrorOrders,
    error: errorOrders,
    refetch: refetchOrders,
  } = useQuery<UseFetchOrdersType, FetchError>({
    queryKey: ["orders", user1d],
    queryFn: getAllOrders,
  });

  // Handle errors
  if (isErrorOrders && errorOrders) {
    const errorMessage =
      errorOrders.response?.data.message ||
      "An error occurred while fetching images.";
    console.error("Fetch orders Error:", errorMessage);
  }

  return {
    orders,
    isLoadingOrders,
    isErrorOrders,
    errorOrders,
    refetchOrders,
  };
}

// export function useOrders(userId: number) {
//   return useQuery<UseFetchOrdersType, Error>({
//     queryKey: ["orders", userId],
//     queryFn: getAllOrders,
//     staleTime: 0,
//     retry: 3,
//   });
// }
