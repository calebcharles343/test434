import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar.tsx";
import Header from "./Header.tsx";

const AppLayout: React.FC = () => {
  return (
    <div className="flex flex-col lg:grid lg:grid-cols-[230px_1fr] lg:grid-rows-[65px_1fr] h-screen text-gray-700 overflow-y-scroll lg:gap-[5px] font-joro">
      <div className="hidden sm:hidden md:hidden lg:block">
        <Sidebar />
      </div>
      <Header />
      <main className="flex flex-col w-full lg:col-start-2 col-span-2 row-start-2 p-4 overflow-y-scroll h-[calc(100vh-65px)]">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
