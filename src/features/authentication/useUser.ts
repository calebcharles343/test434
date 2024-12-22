import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../services/apiAuth";
import { UserType } from "../../interfaces";

export function useUser(id: number) {
  return useQuery<UserType, Error>({
    queryKey: ["user", id],
    queryFn: getUser,
    staleTime: 0,
  });
}

// localStorage.setItem("localUser", JSON.stringify(userData));
