import { useQueryWithStatus } from "../../../hooks/useQueryWithStatus";
// import { OrderType } from "../../../interfaces";
import { getAllOrders, getAllAdminOrders } from "../../../services/apiOrder";

export function useOrders(userId: number) {
  return useQueryWithStatus<any>(["orders", userId.toString()], getAllOrders, {
    enabled: !!userId,
    select: (response) => response.data || [], // Ensure `response` type aligns with the expected structure
  });
}

export function useAdminOrders() {
  return useQueryWithStatus<any>(["adminOrders"], getAllAdminOrders, {
    select: (response) => response.data || [], // Same adjustment here
  });
}
