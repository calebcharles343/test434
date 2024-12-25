import React from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import PageNotFound from "./pages/PageNotFound.tsx";
import Home from "./pages/Home.tsx";
import AppLayout from "./ui/AppLayout.tsx";
import AuthGuard from "./features/authentication/AuthGuard.tsx";
import "react-toastify/dist/ReactToastify.css";
import Auth from "./features/authentication/Auth.tsx";
import CartPage from "./pages/CartPage.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ProductDetails from "./pages/ProductDetails.tsx";
import { Toaster } from "react-hot-toast";
import Orders from "./pages/Orders.tsx";
import ResetPasswordForm from "./features/authentication/ResetPasswordForm.tsx";
import ForgotPasswordForm from "./features/authentication/ForgotPasswordForm.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0, // Always refetch data
      refetchOnWindowFocus: true,
    },
  },
});
const router = createBrowserRouter([
  {
    element: (
      <AuthGuard>
        <AppLayout />
      </AuthGuard>
    ),
    children: [
      { path: "/", element: <Navigate to="home" /> },
      {
        path: "home",
        element: <Home />,
      },
      { path: "home/product/:id", element: <ProductDetails /> },
      {
        path: "cartPage",
        element: <CartPage />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
    ],
  },
  { path: "auth", element: <Auth /> },
  { path: "auth/forgotPassword", element: <ForgotPasswordForm /> },
  { path: "auth/resetPassword/:token", element: <ResetPasswordForm /> },
  { path: "*", element: <PageNotFound /> },
]);

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "10px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "white",
            color: "var(--color-grey-700)",
          },
        }}
      />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
