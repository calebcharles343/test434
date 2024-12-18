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

// Initialize QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
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
    ],
  },
  { path: "auth", element: <Auth /> },
  { path: "*", element: <PageNotFound /> },
]);

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
