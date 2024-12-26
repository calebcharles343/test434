import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { logout as logOutApi } from "../../services/apiAuth";
import { useDispatch } from "react-redux";
import { clearCart } from "../../store/cartSlice";
import { sessionStorageUser } from "../../utils/sessionStorageUser";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const sessionStorageUserX = sessionStorageUser();

  const { mutate: logout, isPending } = useMutation({
    mutationFn: logOutApi,
    onSuccess: () => {
      dispatch(clearCart());

      // Clear React Query cache
      queryClient.clear();

      // Remove JWT token from cookies
      Cookies.remove(`token-${sessionStorageUserX?.id}`);

      // Clear specific items from sessionStorage
      sessionStorage.removeItem("currentSessionUser");
      sessionStorage.removeItem(`token-${sessionStorageUserX?.id}`);

      // Redirect to the auth (login) page
      navigate("/auth", { replace: true });
    },
  });

  return { logout, isPending };
}
