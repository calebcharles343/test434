import { useQuery } from "@tanstack/react-query";
import { getAllAdminOrders } from "../../services/apiOrder.ts";
import Cookies from "js-cookie";
import { sessionStorageUser } from "../../utils/sessionStorageUser.ts";

// const sessionStorageUserX = sessionStorageUser();
export function useAdminOrders() {
  const sessionStorageUserX = sessionStorageUser();
  const token = sessionStorageUserX
    ? Cookies.get(`token-${sessionStorageUserX.id}`)
    : null;

  return useQuery({
    queryKey: ["adminOrders", sessionStorageUserX?.id], // Ensure key depends on user
    queryFn: getAllAdminOrders,
    enabled: !!token, // Fetch only if token exists
    staleTime: 0,
  });
}
