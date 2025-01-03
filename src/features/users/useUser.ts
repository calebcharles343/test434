import { useQuery } from "@tanstack/react-query";
import { UserType } from "../../interfaces";
import { getUser } from "../../services/apiUser";
// import { getUser } from "../../services/apiAuth";

export function useUser(id: number) {
  return useQuery<UserType, Error>({
    queryKey: ["user", id],
    queryFn: getUser,
    staleTime: 0,
  });
}
