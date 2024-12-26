import { useQuery } from "@tanstack/react-query";
import { getAllAdminOrders } from "../../services/apiOrder.ts";
import Cookies from "js-cookie";
import { sessionStorageUser } from "../../utils/sessionStorageUser.ts";

const sessionStorageUserX = sessionStorageUser();

export function useAdminOrders() {
  const token = sessionStorageUserX
    ? Cookies.get(`token-${sessionStorageUserX.id}`)
    : null;

  return useQuery({
    queryKey: ["adminOrders", token], // Include token in the key
    queryFn: getAllAdminOrders,
    enabled: !!token, // Only fetch if the token exists
    staleTime: 0,
  });
}
