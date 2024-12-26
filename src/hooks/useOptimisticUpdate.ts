import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useOptimisticUpdate<TData, TVariables>(
  queryKey: string[],
  mutationFn: (variables: TVariables) => Promise<TData>,
  optimisticUpdate: (
    oldData: TData | undefined,
    newVariables: TVariables
  ) => TData
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey });
      const previousData = queryClient.getQueryData<TData>(queryKey);

      queryClient.setQueryData<TData>(queryKey, (old) =>
        optimisticUpdate(old, newData)
      );

      return { previousData };
    },
    // onError: (err, newData, context: any) => {
    onError: (context: any) => {
      queryClient.setQueryData(queryKey, context.previousData);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
}
