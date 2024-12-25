import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar.tsx";
import Header from "./Header.tsx";
import { useUser } from "../features/authentication/useUser.ts";
import { localStorageUser } from "../utils/localStorageUser.ts";
import Spinner from "./Spinner.tsx";
import { useFetchProducts } from "../features/product/useFetchProducts.ts";
import { useAdminOrders } from "../features/order/useFetchAdminOrders.ts";

const AppLayout: React.FC = () => {
  const localStorageUserX = localStorageUser();

  const { isLoading } = useUser(localStorageUserX?.id);

  // Fetch products using React Query
  const { isLoadingProducts } = useFetchProducts();

  // Fetch admin orders if the user is an admin
  const { isLoading: isLoadingAdminOrders } =
    localStorageUserX?.role === "Admin"
      ? useAdminOrders()
      : { isLoading: false };

  if (isLoading || isLoadingProducts || isLoadingAdminOrders)
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
        <Spinner />
      </div>
    );

  return (
    <div className="min-h-full flex flex-col lg:grid lg:grid-cols-[230px_1fr] lg:grid-rows-[65px_1fr] h-screen text-gray-700 font-joro bg-gray-50">
      {" "}
      <div className="hidden lg:block">
        {" "}
        <Sidebar />{" "}
      </div>{" "}
      <Header />{" "}
      <main className="flex flex-col w-full lg:col-start-2 col-span-2 row-start-2 p-4 overflow-y-scroll flex-grow lg:min-h-[calc(100vh-65px)]">
        {" "}
        <Outlet />{" "}
      </main>{" "}
    </div>
  );
};

export default AppLayout;
