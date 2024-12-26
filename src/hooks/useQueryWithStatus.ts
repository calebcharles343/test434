import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import type { AxiosError } from "axios";

interface QueryResult<T> {
  data?: T;
  status: number;
  message?: string;
}

export function useQueryWithStatus<T>(
  queryKey: string[],
  queryFn: () => Promise<QueryResult<T>>,
  options?: Omit<
    UseQueryOptions<QueryResult<T>, AxiosError>,
    "queryKey" | "queryFn"
  >
) {
  return useQuery<QueryResult<T>, AxiosError>({
    queryKey,
    queryFn,
    ...options,
  });
}
