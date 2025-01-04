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
import ActiveUsers from "./features/user/Users";
import Settings from "./pages/Settings";

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
        path: "cart-page",
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
        path: "admin-orders",
        element: (
          <AuthGuard>
            <AdminOrdersPage />
          </AuthGuard>
        ),
      },
      {
        path: "users",
        element: (
          <AuthGuard>
            <ActiveUsers />
          </AuthGuard>
        ),
      },
      {
        path: "settings",
        element: (
          <AuthGuard>
            <Settings />
          </AuthGuard>
        ),
      },
    ],
  },
  { path: "auth", element: <Auth /> },
  { path: "auth/forgot-password", element: <ForgotPasswordForm /> },
  { path: "auth/reset-password/:token", element: <ResetPasswordForm /> },
  { path: "*", element: <PageNotFound /> },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
