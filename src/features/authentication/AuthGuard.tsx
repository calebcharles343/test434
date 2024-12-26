import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

interface AuthGuardProps {
  children: ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const authToken = Cookies.get("jwt");

  // console.log(authToken);

  if (!authToken) {
    // Clear specific items from localStorage
    localStorage.removeItem("localUser"); // Adjust the key as necessary
    localStorage.removeItem("authData"); // Adjust the key as necessary

    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};

export default AuthGuard;
