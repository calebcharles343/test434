import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useUser } from "../features/authentication/useUser";
import { localStorageUser } from "../utils/localStorageUser";
import Spinner from "./Spinner";
import { useFetchProducts } from "../features/product/useFetchProducts";
import AuthGuard from "../features/authentication/AuthGuard";

const AppLayout: React.FC = () => {
  const localStorageUserX = localStorageUser();
  const isAuthenticated = !!localStorageUserX;

  const { isLoading } = isAuthenticated
    ? useUser(localStorageUserX?.id)
    : { isLoading: false };

  // Fetch products using React Query
  const { isLoadingProducts } = useFetchProducts();

  // // Fetch admin orders if the user is an admin
  // const { isLoading: isLoadingAdminOrders } =
  //   isAuthenticated && localStorageUserX?.role === "Admin"
  //     ? useAdminOrders()
  //     : { isLoading: false };

  if (isLoading || isLoadingProducts) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-full flex flex-col lg:grid lg:grid-cols-[230px_1fr] lg:grid-rows-[65px_1fr] h-screen text-gray-700 font-joro bg-gray-50">
      <div className="hidden lg:block">
        {isAuthenticated ? (
          <AuthGuard>
            <Sidebar />
          </AuthGuard>
        ) : (
          <Sidebar />
        )}
      </div>
      {isAuthenticated ? (
        <AuthGuard>
          <Header />
        </AuthGuard>
      ) : (
        <Header />
      )}
      <main className="flex flex-col w-full lg:col-start-2 col-span-2 row-start-2 p-4 overflow-y-scroll flex-grow lg:min-h-[calc(100vh-65px)]">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
