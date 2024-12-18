import { useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { ProductsType } from "../../interfaces.ts";
import { getAllProducts } from "../../services/apiProducts.ts";

interface ErrorResponse {
  message: string;
}

interface FetchError extends AxiosError {
  response?: AxiosResponse<ErrorResponse>;
}

export function useFetchProducts() {
  const {
    data: products,
    isLoading: isLoadingProducts,
    isError: isErrorProducts,
    error: errorProducts,
    refetch: refetchProducts,
  } = useQuery<ProductsType, FetchError>({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

  // Handle errors
  if (isErrorProducts && errorProducts) {
    const errorMessage =
      errorProducts.response?.data.message ||
      "An error occurred while fetching images.";
    console.error("Fetch products Error:", errorMessage);
  }

  return {
    products,
    isLoadingProducts,
    isErrorProducts,
    errorProducts,
    refetchProducts,
  };
}
