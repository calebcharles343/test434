import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { deleteOrder as deleteOrderApi } from "../../services/apiOrder";
import toast from "react-hot-toast";

interface ErrorResponse {
  message: string;
}

interface FetchError extends AxiosError {
  response?: AxiosResponse<ErrorResponse>;
}

export function useDeleteOrder() {
  const queryClient = useQueryClient();

  const {
    mutate: deleteOrder,
    isPending: isDeletingOrder,
    isError: isErrorDeletingOrder,
    error: errorDeletingOrder,
  } = useMutation<void, FetchError, number>({
    mutationFn: (id: number) => deleteOrderApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["adminOrders"] as any);
      toast.success("Order deleted successfully");

      // Invalidate and refetch Orders
    },
    onError: (error) => {
      toast.error(`${error.response?.data.message}`);

      const errorMessage =
        error.response?.data.message ||
        "An error occurred while deleting the Order.";
      console.error("Delete drder Error:", errorMessage);
    },
  });

  return {
    deleteOrder,
    isDeletingOrder,
    isErrorDeletingOrder,
    errorDeletingOrder,
  };
}
