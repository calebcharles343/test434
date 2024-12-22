import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar.tsx";
import Header from "./Header.tsx";
import { useUser } from "../features/authentication/useUser.ts";
import { localStorageUser } from "../utils/localStorageUser.ts";
import Spinner from "./Spinner.tsx";
import { useFetchProducts } from "../features/product/useFetchProducts.ts";

const AppLayout: React.FC = () => {
  const localStorageUserX = localStorageUser();

  const { isLoading } = useUser(localStorageUserX?.id);

  // const { isLoadingOrders } = useFetchOrders(localStorageUserX.id);

  // Fetch products using React Query
  const { isLoadingProducts } = useFetchProducts();

  if (isLoading || isLoadingProducts)
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
        <Spinner />;
      </div>
    );

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-[230px_1fr] lg:grid-rows-[65px_1fr] h-screen text-gray-700 font-joro">
      <div className="hidden lg:block">
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
