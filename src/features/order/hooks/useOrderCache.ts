import { useQueryClient } from "@tanstack/react-query";
import { OrderType } from "../../../interfaces";
import { getOrder } from "../../../services/apiOrder";

export function useOrderCache() {
  const queryClient = useQueryClient();

  const prefetchOrder = async (orderId: number) => {
    await queryClient.prefetchQuery({
      queryKey: ["orders", orderId.toString()],
      queryFn: () => getOrder(orderId),
    });
  };

  const invalidateOrders = () => {
    queryClient.invalidateQueries(["orders"] as any);
    queryClient.invalidateQueries(["adminOrders"] as any);
  };

  const getOrderFromCache = (orderId: number): OrderType | undefined => {
    return queryClient.getQueryData(["orders", orderId.toString()]);
  };

  return {
    prefetchOrder,
    invalidateOrders,
    getOrderFromCache,
  };
}
