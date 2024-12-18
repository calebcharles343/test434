import React from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../features/authentication/useLogout.ts";
import SpinnerMini from "./SpinnerMini.tsx";
import sideBarImg2 from "../data/img/SIdeBar-2.jpg";
import { BiCart, BiHome, BiInfoCircle, BiLogOut } from "react-icons/bi";

const Sidebar: React.FC = () => {
  const { logout, isPending } = useLogout();

  const handleLogout = async () => {
    logout();
  };

  return (
    <div>
      <nav
        className="flex flex-col bg-gray-800 text-gray-50 items-center row-start-1 row-end-3 w-full min-w-[230px] h-[100vh] px-4 pt-4 pb-24 shadow-xl gap-4 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${sideBarImg2})` }}
      >
        <span
          className="text-[16px] text-[#ffa82b] font-extrabold p-2 border border-[#ffa82b] rounded-lg"
          style={{ fontFamily: "Syncopate" }}
        >
          Shopping List
        </span>
        <ul className="flex flex-col gap-2 text-md w-full p-8 flex-grow">
          <li>
            <Link
              to="Home"
              className="flex items-center p-2 rounded hover:bg-[#ffa82b] hover:text-gray-800 transition-colors duration-200"
            >
              <BiHome className="mr-2" /> Home
            </Link>
          </li>
          <li>
            <Link
              to="cartPage"
              className="flex items-center p-2 rounded hover:bg-[#ffa82b] hover:text-gray-800 transition-colors duration-200"
            >
              <BiCart className="mr-2" /> Cart
            </Link>
          </li>
          <li>
            <Link
              to="home/product/:id"
              className="flex items-center p-2 rounded hover:bg-[#ffa82b] hover:text-gray-800 transition-colors duration-200"
            >
              <BiInfoCircle className="mr-2" /> Product info
            </Link>
          </li>
        </ul>

        {isPending ? (
          <SpinnerMini />
        ) : (
          <button
            className="flex items-center justify-center gap-2 mt-auto mb-0 text-gray-800 bg-gray-50 p-2 rounded hover:bg-[#ffa82b] hover:text-gray-800 transition-colors duration-200"
            onClick={handleLogout}
          >
            <BiLogOut />
            Log out
          </button>
        )}
      </nav>
    </div>
  );
};

export default Sidebar;
