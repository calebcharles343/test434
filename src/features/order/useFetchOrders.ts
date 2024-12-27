import { useQuery } from "@tanstack/react-query";
import { getAllOrders } from "../../services/apiOrder.ts";
import { sessionStorageUser } from "../../utils/sessionStorageUser.ts";
export function useFetchOrders() {
  const sessionStorageUserX = sessionStorageUser();

  return useQuery({
    queryKey: ["orders", sessionStorageUserX?.id], // Ensure key depends on user
    queryFn: getAllOrders,
    enabled: !!sessionStorageUserX, // Fetch only if user exists
    staleTime: 0,
  });
}
