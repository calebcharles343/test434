import { useState, ChangeEvent, useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useUploadImage } from "../hooks/images/useUploadImage";
import SpinnerMini from "./SpinnerMini";
import outline from "../data/img/passportDPnew.webp";
import { localStorageUser } from "../utils/localStorageUser";
import { imageHeader } from "../utils/imageApiHeader";
import { useUser } from "../features/authentication/useUser";

const UserAvatar: React.FC = () => {
  const [errorFile, setErrorFile] = useState<string | undefined>();
  const [isUpdateBox, setIsUpdateBox] = useState<boolean>(false);

  const avatarRef = useRef<HTMLDivElement>(null);

  const queryClient = useQueryClient();
  const localStorageUserX = localStorageUser();

  const { data: freshUser, refetch: refetchUser } = useUser(
    localStorageUserX?.id
  );

  useEffect(() => {
    refetchUser();
  }, [refetchUser]);

  const { uploadImage, isUploading } = useUploadImage(
    imageHeader(`userAvatar-${localStorageUserX?.id}`)
  );

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      if (!["image/jpg", "image/jpeg", "image/png"].includes(file.type)) {
        setErrorFile("File must be in JPG, JPEG, or PNG format.");
        return;
      }
      setErrorFile("");
      const formData = new FormData();
      formData.append("image", file);
      uploadImage(formData, {
        onSuccess: () => {
          queryClient.invalidateQueries(["user"] as any);
        },
      });
    }
    setIsUpdateBox(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      avatarRef.current &&
      !avatarRef.current.contains(event.target as Node)
    ) {
      setIsUpdateBox(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={avatarRef} className="min-w-10 relative flex items-center gap-6">
      {isUploading ? (
        <SpinnerMini />
      ) : (
        <img
          onClick={() => setIsUpdateBox((prev) => !prev)}
          className="w-10 h-10 rounded-full cursor-pointer"
          src={
            freshUser?.id === localStorageUserX.id
              ? freshUser?.avatar
              : localStorageUserX.avatar || outline
          }
          alt="User Avatar"
        />
      )}
      <span className="hidden sm:block">{localStorageUserX?.name}</span>
      {isUpdateBox && (
        <div className="absolute transform -translate-x-10 translate-y-9  flex items-center justify-center bg-white rounded-md border p-1 shadow-lg">
          <input
            id="imageInput"
            type="file"
            className="hidden"
            onChange={handleUpload}
          />
          <label
            htmlFor="imageInput"
            className="flex text-xs items-center justify-center border border-solid border-white rounded-lg cursor-pointer w-20 md:w-28 sm:w-24"
          >
            {isUploading ? "..." : "Upload Photo"}
          </label>
          {errorFile && <p>{errorFile}</p>}
        </div>
      )}
    </div>
  );
};

export default UserAvatar;
