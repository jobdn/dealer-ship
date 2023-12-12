import { Navigate } from "react-router-dom";
import { useAuth } from "../../shared/hooks/useAuth";

export interface ProtectedRouteProps {
  children?: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const auth = useAuth();

  if (!auth?.user?.isAuth) {
    alert("Чтобы увидеть список авто, войдите в приложение");
    return <Navigate to="/" />;
  }

  return children;
};
