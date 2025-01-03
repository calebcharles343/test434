import { useState, useEffect, useRef, ChangeEvent } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useUploadImage } from "../hooks/images/useUploadImage";
import SpinnerMini from "./SpinnerMini";
import outline from "../data/img/passportDPnew.webp";

import { imageHeader } from "../utils/imageApiHeader";
import { useUser } from "../features/users/useUser";
import { sessionStorageUser } from "../utils/sessionStorageUser";

const UserAvatar: React.FC = () => {
  const [errorFile, setErrorFile] = useState<string | undefined>();
  const [isUpdateBox, setIsUpdateBox] = useState<boolean>(false);

  const avatarRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();

  // Get the current user from localStorage
  const sessionStorageUserX = sessionStorageUser();

  // Check if the user is authenticated
  const isAuthenticated = Boolean(sessionStorageUserX);

  // Safely call useUser hook only when authenticated
  const { data: user, refetch: refetchUser } = isAuthenticated
    ? useUser(sessionStorageUserX!.id)
    : { data: null, refetch: () => {} };

  // Safely call useUploadImage hook only when authenticated
  const { uploadImage, isUploading } = isAuthenticated
    ? useUploadImage(imageHeader(`userAvatar-${sessionStorageUserX!.id}`))
    : { uploadImage: () => {}, isUploading: false };

  // Refetch user data when the component mounts
  useEffect(() => {
    if (isAuthenticated) {
      refetchUser();
    }
  }, [isAuthenticated, refetchUser]);

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];

    if (!["image/jpg", "image/jpeg", "image/png"].includes(file.type)) {
      setErrorFile("File must be in JPG, JPEG, or PNG format.");
      return;
    }

    setErrorFile(""); // Clear any previous errors
    const formData = new FormData();
    formData.append("image", file);

    uploadImage(formData, {
      onSuccess: () => {
        queryClient.invalidateQueries(["user"] as any);
        refetchUser();
      },
    });

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

  // Fallback if user data is unavailable
  if (!isAuthenticated) {
    return (
      <div className="min-w-10 relative flex items-center gap-6">
        <img
          className="w-10 h-10 rounded-full"
          src={outline}
          alt="Default Avatar"
        />
        <span className="hidden sm:block">Guest</span>
      </div>
    );
  }

  // Determine avatar source
  const avatarSrc =
    user?.id === sessionStorageUserX?.id
      ? user?.avatar || outline
      : sessionStorageUserX?.avatar || outline;

  return (
    <div ref={avatarRef} className="min-w-10 relative flex items-center gap-6">
      {isUploading ? (
        <SpinnerMini />
      ) : (
        <img
          onClick={() => setIsUpdateBox((prev) => !prev)}
          className="w-10 h-10 rounded-full object-cover cursor-pointer"
          src={avatarSrc}
          alt="User Avatar"
        />
      )}
      <span className="hidden sm:block">
        {sessionStorageUserX?.name?.toUpperCase() || "Guest"}
      </span>
      {isUpdateBox && (
        <div className="absolute transform -translate-x-10 translate-y-9 flex items-center justify-center bg-white rounded-md border p-1 shadow-lg">
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
          {errorFile && <p className="text-red-500">{errorFile}</p>}
        </div>
      )}
    </div>
  );
};

export default UserAvatar;
