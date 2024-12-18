import outline from "../data/img/passportDPnew.webp";
import { HiSearch } from "react-icons/hi";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useUploadImage } from "../hooks/images/useUploadImage";
import { useQueryClient } from "@tanstack/react-query";
import SpinnerMini from "./SpinnerMini";

import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import CartIcon from "./CartIcon";
import { useNavigate } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import Sidebar from "./Sidebar";
import { useUser } from "../features/authentication/useUser";
import { imageHeader } from "../utils/imageApiHeader";

const Header: React.FC = () => {
  const [errorFile, setErrorFile] = useState<string | undefined>();
  const [isUpdateBox, setIsUpdateBox] = useState<boolean>(false);
  const [isMenu, setIsMenu] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const sidebarRef = useRef<HTMLDivElement>(null);

  const storedUserJSON = localStorage.getItem("localUser");
  let storedUser = null;

  if (storedUserJSON) {
    try {
      storedUser = JSON.parse(storedUserJSON);
      console.log(storedUser);
    } catch (error) {
      console.error("Error parsing stored user data:", error);
    }
  } else {
    console.log("No stored user found");
  }

  const {
    isLoading: isLoadingUser,
    user: userNew,
    refetch: refetchUser,
  } = useUser(storedUser?.id);

  useEffect(() => {
    refetchUser();
  }, [refetchUser]);

  const { uploadImage, isUploading } = useUploadImage(
    imageHeader(`userAvatar-${storedUser?.id}`)
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
      console.log("FormData:", formData);
      uploadImage(formData, {
        onSuccess: () => {
          queryClient.invalidateQueries(["user"] as any);
          refetchUser();
        },
      });
    }
  };

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/cartPage`);
  };

  const handleMenu = () => {
    setIsMenu(!isMenu);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target as Node)
    ) {
      setIsMenu(false);
    }
  };

  useEffect(() => {
    if (isMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenu]);

  const cart = useSelector((state: RootState) => state.cart);

  return (
    <header className="relative flex items-center justify-between col-start-2 col-end-3 bg-[#FFA82B] shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-[20px] border border-[rgba(255, 155, 0, 0.57)] rounded-lg p-4 z-50">
      <button type="button" className="lg:hidden mr-8" onClick={handleMenu}>
        <BiMenu style={{ fontSize: "40px", color: "#333" }} />
      </button>
      {isMenu && (
        <div
          ref={sidebarRef}
          className={`lg:hidden absolute top-0 left-0 w-[230px] z-50 transform transition-transform duration-500 ease-in-out ${
            isMenu ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Sidebar />
        </div>
      )}
      <form className="flex-grow">
        <div className="flex items-center gap-2">
          <button type="button">
            <HiSearch style={{ fontSize: "20px", color: "#333" }} />
          </button>
          <input
            className="px-4 w-[60%] h-8 rounded-full focus:outline-none"
            type="text"
            placeholder="search"
          />
        </div>
      </form>
      <div className="flex items-center gap-4">
        <div className="flex" onClick={handleClick}>
          <CartIcon length={cart.items.length} />
        </div>
        {isUploading || isLoadingUser ? (
          <SpinnerMini />
        ) : (
          <div className="relative flex items-center gap-6">
            <img
              onClick={() => setIsUpdateBox(!isUpdateBox)}
              className="w-12 h-12 rounded-full cursor-pointer"
              src={userNew?.data?.avatar || outline}
              alt="passport outline"
            />
            <span className="hidden sm:block">{userNew?.data?.name}</span>
            {isUpdateBox && (
              <div className="absolute bottom-[-50px] bg-white rounded-md border border-gray-800 p-2">
                <input
                  id="imageInput"
                  type="file"
                  className="hidden"
                  onChange={handleUpload}
                />
                <label
                  htmlFor="imageInput"
                  className="flex items-center justify-center border border-solid border-white p-2 rounded-lg cursor-pointer w-32 md:w-28 sm:w-24"
                >
                  {isUploading ? "..." : "Upload Photo"}
                </label>
                {errorFile && <p>{errorFile}</p>}
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
