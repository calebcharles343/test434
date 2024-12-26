import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import PageNotFound from "./pages/PageNotFound";
import Home from "./pages/Home";
import AppLayout from "./ui/AppLayout";
import AuthGuard from "./features/authentication/AuthGuard";
import Auth from "./features/authentication/Auth";
import CartPage from "./pages/CartPage";
import ProductDetails from "./pages/ProductDetails";
import OrdersPage from "./pages/OrdersPage";
import ResetPasswordForm from "./features/authentication/ResetPasswordForm";
import ForgotPasswordForm from "./features/authentication/ForgotPasswordForm";
import AdminOrdersPage from "./pages/AdminOdersPage";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <Navigate to="home" /> },
      { path: "home", element: <Home /> },
      {
        path: "home/product/:id",
        element: (
          <AuthGuard>
            <ProductDetails />
          </AuthGuard>
        ),
      },
      {
        path: "cartPage",
        element: (
          <AuthGuard>
            <CartPage />
          </AuthGuard>
        ),
      },
      {
        path: "orders",
        element: (
          <AuthGuard>
            <OrdersPage />
          </AuthGuard>
        ),
      },
      {
        path: "adminOrders",
        element: (
          <AuthGuard>
            <AdminOrdersPage />
          </AuthGuard>
        ),
      },
    ],
  },
  { path: "auth", element: <Auth /> },
  { path: "auth/forgotPassword", element: <ForgotPasswordForm /> },
  { path: "auth/resetPassword/:token", element: <ResetPasswordForm /> },
  { path: "*", element: <PageNotFound /> },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
