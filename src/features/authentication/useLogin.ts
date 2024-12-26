import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";
// import { useDispatch } from "react-redux";
// import { setUser, setToken, clearAuthState } from "../../store/authSlice";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginApi(email, password),
    onSuccess: (data) => {
      if (data.status === 200) {
        const userData = data.data.user;

        // Clear React Query cache
        queryClient.clear();

        // Set JWT token in cookies
        Cookies.set("jwt", data.data.token, {
          expires: 7,
          secure: true,
          sameSite: "strict",
        });

        // const authToken = Cookies.get("jwt");
        // Update Redux state
        // dispatch(setUser(userData));
        // dispatch(setToken(data.data.token));
        localStorage.setItem("localUser", JSON.stringify(userData));
        localStorage.setItem(
          `token${userData.id}`,
          JSON.stringify(data.data.token)
        );

        // Redirect to the home page

        navigate("/home", { replace: true });
      } else {
        toast.error("Provided email or password are incorrect");
        console.error("Login Error:", data.message);
      }
    },
    onError: (err) => {
      toast.error("Network or server error");
      console.log("ERROR", err);
    },
  });

  return { login, isPending };
}
