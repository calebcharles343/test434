import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { logout as logOutApi } from "../../services/apiAuth";
import { useDispatch } from "react-redux";
import { clearCart } from "../../store/cartSlice";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const { mutate: logout, isPending } = useMutation({
    mutationFn: logOutApi,
    onSuccess: () => {
      dispatch(clearCart());

      // Clear React Query cache
      queryClient.clear();

      // Remove JWT token from cookies
      Cookies.remove("jwt");

      // Clear all local storage
      localStorage.clear();

      // Redirect to the auth (login) page
      navigate("/auth", { replace: true });
    },
  });

  return { logout, isPending };
}
