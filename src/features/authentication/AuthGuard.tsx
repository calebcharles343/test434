import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import {
  sessionStorageUser,
  getUserToken,
} from "../../utils/sessionStorageUser";

interface AuthGuardProps {
  children: ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const sessionStorageUserX = sessionStorageUser();

  if (!sessionStorageUserX) {
    return <Navigate to="/auth" replace />;
  }

  const authToken = getUserToken(sessionStorageUserX.id);

  if (!authToken) {
    sessionStorage.removeItem("currentSessionUser");
    sessionStorage.removeItem(`token-${sessionStorageUserX.id}`);
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};

export default AuthGuard;
