import { Outlet } from "react-router-dom";
import { AuthProvider } from "../../shared/UI/AuthProvider";

export const AuthLayout = () => {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
};
