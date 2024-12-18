import { useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { ProductType } from "../../interfaces.ts";
import { getProduct } from "../../services/apiProducts.ts";

interface ErrorResponse {
  message: string;
}

interface FetchError extends AxiosError {
  response?: AxiosResponse<ErrorResponse>;
}

export function useGetProduct(id: number) {
  const {
    data: product,
    isLoading: isLoadingProduct,
    isError: isErrorProduct,
    error: errorProduct,
    refetch: refetchProduct,
  } = useQuery<{ data: ProductType }, FetchError>({
    queryKey: [`product-${id}`],
    queryFn: () => getProduct(id), // Pass the function reference
  });

  // Handle errors
  if (isErrorProduct && errorProduct) {
    const errorMessage =
      errorProduct.response?.data.message ||
      "An error occurred while fetching the product.";
    console.error("Fetch product Error:", errorMessage);
  }

  return {
    product,
    isLoadingProduct,
    isErrorProduct,
    errorProduct,
    refetchProduct,
  };
}
