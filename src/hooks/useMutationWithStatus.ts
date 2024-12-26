import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import type { AxiosError } from "axios";

interface MutationResult<T> {
  data?: T;
  status: number;
  message?: string;
}

export function useMutationWithStatus<TData, TVariables>(
  mutationFn: (variables: TVariables) => Promise<MutationResult<TData>>,
  options?: Omit<
    UseMutationOptions<MutationResult<TData>, AxiosError, TVariables>,
    "mutationFn"
  >
) {
  return useMutation<MutationResult<TData>, AxiosError, TVariables>({
    mutationFn,
    ...options,
  });
}
