import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { closeAccount as closeAccountAPI } from "../../services/apiUser";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { clearCart } from "../../store/cartSlice";
import { sessionStorageUser } from "../../utils/sessionStorageUser";

interface ErrorResponse {
  message: string;
}

interface FetchError extends AxiosError {
  response?: AxiosResponse<ErrorResponse>;
}

export function useCloseAccount() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const {
    mutate: closeAccount,
    isPending,
    isError,
    error,
  } = useMutation<void, FetchError>({
    mutationFn: () => closeAccountAPI(),
    onSuccess: () => {
      dispatch(clearCart());
      // Clear sessionStorage
      sessionStorage.removeItem("currentSessionUser");
      sessionStorage.clear();

      // Clear cookies
      Cookies.remove(`token-${sessionStorageUser()?.id}`);

      // Clear React Query cache
      queryClient.clear();
      // Redirect to the auth (login) page
      navigate("/auth", { replace: true });
    },
    onError: (error) => {
      toast.error("Error closing account");

      const errorMessage =
        error.response?.data.message ||
        "An error occurred while closing account.";
      console.error("Error:", errorMessage);
    },
  });

  return {
    closeAccount,
    isPending,
    isError,
    error,
  };
}
