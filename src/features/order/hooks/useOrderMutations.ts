import { useMutationWithStatus } from "../../../hooks/useMutationWithStatus";
import { OrdersType, OrderType } from "../../../interfaces";
import {
  createOrder,
  updateOrderStatus,
  cancelOrder,
  deleteOrder,
} from "../../../services/apiOrder";
import { queryClient } from "../../../lib/react-query";
import toast from "react-hot-toast";

export function useCreateOrder() {
  return useMutationWithStatus<
    OrdersType,
    { items: { productId: number; quantity: number }[] }
  >(createOrder, {
    onSuccess: (response) => {
      if (response.status === 201) {
        queryClient.invalidateQueries(["orders"] as any);
        toast.success("Order created successfully");
      }
    },
    onError: () => {
      toast.error("Failed to create order");
    },
  });
}

export function useUpdateOrderStatus(orderId: number) {
  return useMutationWithStatus<OrderType, { status: string }>(
    (data) => updateOrderStatus(orderId, data),
    {
      onSuccess: (response) => {
        if (response.status === 200) {
          queryClient.invalidateQueries(["orders"] as any);
          queryClient.invalidateQueries(["adminOrders"] as any);
          toast.success("Order status updated");
        }
      },
      onError: () => {
        toast.error("Failed to update order status");
      },
    }
  );
}

export function useCancelOrder(orderId: number) {
  return useMutationWithStatus<OrderType, { status: string }>(
    (data) => cancelOrder(orderId, data),
    {
      onSuccess: (response) => {
        if (response.status === 200) {
          queryClient.invalidateQueries(["orders"] as any);
          toast.success("Order cancelled");
        }
      },
      onError: () => {
        toast.error("Failed to cancel order");
      },
    }
  );
}

export function useDeleteOrder() {
  return useMutationWithStatus<void, number>(deleteOrder, {
    onSuccess: () => {
      queryClient.invalidateQueries(["orders"] as any);
      queryClient.invalidateQueries(["adminOrders"] as any);
      toast.success("Order deleted");
    },
    onError: () => {
      toast.error("Failed to delete order");
    },
  });
}
