import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadImageApi } from "../../services/apiUploadImage";
import toast from "react-hot-toast";

export function useUploadImage(headers: Record<string, string>) {
  const queryClient = useQueryClient();

  const {
    mutate: uploadImage,
    isPending: isUploading,
    isError,
    error,
  } = useMutation({
    mutationFn: async (formData: FormData) => {
      return uploadImageApi(formData, headers);
    },
    onSuccess: () => {
      toast.success("Image upload successfull");
      // Invalidate user query to refetch data
      queryClient.invalidateQueries(["user"] as any);
    },
    onError: () => {
      toast.error("Error uploading image");
      console.error("An error occurred while uploading the file.");
    },
  });

  return { uploadImage, isUploading, isError, error };
}
