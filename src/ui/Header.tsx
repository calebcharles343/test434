import outline from "../data/img/passportDPnew.webp";
import { HiSearch } from "react-icons/hi";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useUploadImage } from "../hooks/images/useUploadImage";
import { useQueryClient } from "@tanstack/react-query";
import SpinnerMini from "./SpinnerMini";

import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import CartIcon from "./CartIcon";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import Sidebar from "./Sidebar";
import { useUser } from "../features/authentication/useUser";
import { imageHeader } from "../utils/imageApiHeader";
import { localStorageUser } from "../utils/localStorageUser";
import { useDispatch } from "react-redux";
import {
  setQuery,
  removeQuery,
  setFilterByRating,
} from "../store/searchBarSlice";
import CheckBox from "./CheckBox";

const Header: React.FC = () => {
  const [errorFile, setErrorFile] = useState<string | undefined>();
  const [isUpdateBox, setIsUpdateBox] = useState<boolean>(false);
  const [isDropDown, setIsDropDown] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const localStorageUserX = localStorageUser();
  const location = useLocation();

  const {
    data: freshUser,
    refetch: refetchUser,
    isLoading: isLoadingUser,
  } = useUser(localStorageUserX?.id);

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
      console.log("FormData:", formData);
      uploadImage(formData, {
        onSuccess: () => {
          queryClient.invalidateQueries(["user"] as any);
          refetchUser();
        },
      });
    }
    setIsUpdateBox(false);
  };

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/cartPage`);
  };

  const handleMenu = () => {
    setIsDropDown(!isDropDown);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target as Node)
    ) {
      setIsDropDown(false);
    }
  };

  useEffect(() => {
    if (isDropDown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropDown]);

  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);
  const filterByRating = useSelector(
    (state: RootState) => state.SearchBarQuery.filterByRating
  );
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setQuery(e.target.value)); // Dispatch the action with the input value
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilterByRating(e.target.checked));
  };
  return (
    <header className="relative flex items-center justify-between col-start-2 col-end-3 bg-[#FFA82B] shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-[20px] border border-[rgba(255, 155, 0, 0.57)] rounded-lg p-4 z-50">
      <button type="button" className="lg:hidden mr-8" onClick={handleMenu}>
        <BiMenu style={{ fontSize: "40px", color: "#333" }} />
      </button>
      {isDropDown && (
        <div
          ref={sidebarRef}
          className={`lg:hidden absolute top-0 left-0 w-[230px] z-50 transform transition-transform duration-500 ease-in-out ${
            isDropDown ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Sidebar />
        </div>
      )}
      <form className="relative flex-grow">
        {location.pathname === "/Home" && (
          <div className="flex items-center gap-2">
            <button type="button">
              <HiSearch style={{ fontSize: "20px", color: "#333" }} />
            </button>
            <input
              className="px-4 w-[60%] h-8 rounded-full focus:outline-none"
              type="text"
              placeholder="Search"
            />

            <div className="absolute right-1/2 top-10 flex items-center bg-white border border-gray-800">
              <label
                htmlFor="ratingCheckbox"
                className="flex items-center ml-4"
              >
                <input
                  id="ratingCheckbox"
                  type="checkbox"
                  className=" relative mr-2 outline-none bg-[#FFA82B] w-5 h-5 rounded focus:ring-2 focus:ring-[#FFA82B]"
                  checked={filterByRating}
                  onChange={handleCheckboxChange}
                />
                <span className="absolute">
                  <CheckBox
                    onChange={handleInputChange}
                    checked={filterByRating}
                    label="Rating Average"
                  />
                </span>
                Filter by Rating
              </label>
            </div>
          </div>
        )}
      </form>
      <div className="flex min-h-max items-center gap-4">
        <div className="flex" onClick={handleClick}>
          <CartIcon length={cart.items.length} />
        </div>

        <div className="relative flex items-center gap-6">
          {isUploading || isLoadingUser ? (
            <SpinnerMini />
          ) : (
            <img
              onClick={() => setIsUpdateBox(!isUpdateBox)}
              className="w-10 h-10 rounded-full cursor-pointer"
              src={
                freshUser?.id === localStorageUserX.id
                  ? freshUser?.avatar
                  : localStorageUserX.avatar || outline
              }
              alt="passport outline"
            />
          )}
          <span className="hidden sm:block">{localStorageUserX.name}</span>
          {isUpdateBox && (
            <div className="absolute flex items-center justify-center bottom-[-50px] bg-white rounded-md border border-gray-800 p-2">
              <input
                id="imageInput"
                type="file"
                className="hidden"
                onChange={handleUpload}
              />
              <label
                htmlFor="imageInput"
                className="flex text-sm items-center justify-center border border-solid border-white p-2 rounded-lg cursor-pointer w-32 md:w-28 sm:w-24"
              >
                {isUploading ? "..." : "Upload Photo"}
              </label>
              {errorFile && <p>{errorFile}</p>}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
