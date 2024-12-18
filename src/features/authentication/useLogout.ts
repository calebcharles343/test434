import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { logout as logOutApi } from "../../services/apiAuth.ts";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout, isPending } = useMutation({
    mutationFn: logOutApi,
    onSuccess: () => {
      // Correct usage of removeQueries with just the query key
      queryClient.removeQueries(["user"] as any);

      // Clear the JWT token from cookies
      Cookies.remove("jwt");

      // Redirect to the auth page (login page)
      navigate("/auth", { replace: true });
    },
  });

  return { logout, isPending };
}
