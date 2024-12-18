import { useQuery } from "@tanstack/react-query";
import { useUserType } from "../../interfaces.ts";
import { getUser } from "../../services/apiAuth.ts";

export function useUser(UserId: number | undefined) {
  const {
    data: user,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<useUserType | undefined>({
    queryKey: ["user"], // Cache key is specific to the UserId
    queryFn: () => getUser(), // Fetch the user by ID
    enabled: !!UserId, // Only fetch if UserId is defined
    staleTime: 5000 * 60 * 1000, // Cache for 5 minutes
    retry: 3, // Retry up to 3 times in case of failure
  });

  return { user, isLoading, isError, error, refetch };
}
// export function useUser(UserId: number | undefined) {
//   const {
//     data: user,
//     isLoading,
//     isError,
//     error,
//     refetch,
//   } = useQuery<useUserType, Error>({
//     queryKey: ["user", UserId], // Cache key is specific to the UserId
//     queryFn: () => getUser(UserId!), // Fetch the user by ID
//     enabled: !!UserId, // Only fetch if UserId is defined
//     staleTime: 5 * 60 * 1000, // Cache for 5 minutes
//     retry: 3, // Retry up to 3 times in case of failure
//   });

//   return { user, isLoading, isError, error, refetch };
// }
