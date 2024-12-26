import { useQuery } from "@tanstack/react-query";
// import { AxiosError, AxiosResponse } from "axios";
import { OrdersType } from "../../interfaces.ts";
import { getAllAdminOrders } from "../../services/apiOrder.ts";
import { AxiosError, AxiosResponse } from "axios";

interface ErrorResponse {
  message: string;
}
interface UseFetchOrdersType {
  data: OrdersType;
}

interface FetchError extends AxiosError {
  response?: AxiosResponse<ErrorResponse>;
}

export function useFetchAdminOrders() {
  const {
    data: adminOrders,
    isLoading: isLoadingAdminOrders,
    isError: isErrorAdminOrders,
    error: errorAdminOrders,
    refetch: refetchAdminOrders,
  } = useQuery<UseFetchOrdersType, FetchError>({
    queryKey: ["adminOrders"],
    queryFn: getAllAdminOrders,
  });

  // Handle errors
  if (isErrorAdminOrders && errorAdminOrders) {
    const errorMessage =
      errorAdminOrders.response?.data.message ||
      "An error occurred while fetching images.";
    console.error("Fetch orders Error:", errorMessage);
  }

  return {
    adminOrders,
    isLoadingAdminOrders,
    isErrorAdminOrders,
    errorAdminOrders,
    refetchAdminOrders,
  };
}

// export function useAdminOrders() {
//   return useQuery<UseFetchOrdersType, Error>({
//     queryKey: ["adminOrders"],
//     queryFn: getAllAdminOrders,
//     staleTime: 0,
//     retry: 3,
//   });
// }
