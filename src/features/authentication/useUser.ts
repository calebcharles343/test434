import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../services/apiAuth";
import { UserType } from "../../interfaces";

export function useUser(id: number) {
  return useQuery<UserType, Error>({
    queryKey: ["user", id],
    queryFn: getUser,
    staleTime: 0,
    refetchOnWindowFocus: true,
    refetchInterval: 3000, // Refetch every 3 seconds
  });
}
