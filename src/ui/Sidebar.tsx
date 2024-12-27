import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../features/authentication/useLogout.ts";
import SpinnerMini from "./SpinnerMini.tsx";
import sideBarImg2 from "../data/img/SIdeBar-2.jpg";
import {
  BiCart,
  BiHome,
  BiInfoCircle,
  BiLogIn,
  BiLogOut,
} from "react-icons/bi";
import { FiMenu } from "react-icons/fi";
import { sessionStorageUser } from "../utils/sessionStorageUser.ts";
import Uploader from "../data/Uploader.tsx";

const Sidebar: React.FC = () => {
  const [user, setUser] = useState(sessionStorageUser());
  const isAuthenticated = !!user;
  const { logout, isPending } = useLogout();

  const handleLogout = async () => {
    logout();
  };

  useEffect(() => {
    const handleStorageChange = () => {
      setUser(sessionStorageUser());
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <div>
      <nav
        className=" text-sm md:text-lg flex flex-col bg-gray-800 text-gray-50 items-center row-start-1 row-end-3 w-[170px] md:min-w-[230px] h-[100vh]  pt-4 pb-24 shadow-xl gap-4 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${sideBarImg2})` }}
      >
        <span
          className="text-sm text-[#ffa82b] font-extrabold p-2 border border-[#ffa82b] rounded-lg"
          style={{ fontFamily: "Syncopate" }}
        >
          E-COMMERCE
        </span>
        <ul className="flex flex-col item gap-2 w-full pl-8 md:pl-12 flex-grow">
          <li>
            <Link
              to="home"
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
          {isAuthenticated && user.role !== "Admin" && (
            <li>
              <Link
                to="orders"
                className="flex items-center p-2 rounded hover:bg-[#ffa82b] hover:text-gray-800 transition-colors duration-200"
              >
                <FiMenu className="mr-2" /> Orders
              </Link>
            </li>
          )}
          {isAuthenticated && user.role === "Admin" && (
            <li>
              <Link
                to="adminOrders"
                className="flex items-center p-2 rounded hover:bg-[#ffa82b] hover:text-gray-800 transition-colors duration-200"
              >
                <FiMenu className="mr-2" /> Admin Orders
              </Link>
            </li>
          )}
        </ul>
        {isAuthenticated && user.role === "Admin" && (
          <div>
            <Uploader />
          </div>
        )}

        {isAuthenticated ? (
          isPending ? (
            <SpinnerMini />
          ) : (
            <button
              className="flex items-center justify-center gap-2 mt-auto mb-0 text-gray-800 bg-gray-50 p-2 rounded hover:bg-[#ffa82b] hover:text-gray-800 transition-colors duration-200"
              onClick={handleLogout}
            >
              <BiLogOut />
              Log out
            </button>
          )
        ) : (
          <Link
            to="auth"
            className="flex items-center justify-center gap-2 mt-auto mb-0 text-gray-800 bg-gray-50 p-2 rounded hover:bg-[#ffa82b] hover:text-gray-800 transition-colors duration-200"
          >
            <BiLogIn />
            Login
          </Link>
        )}
      </nav>
    </div>
  );
};

export default Sidebar;
