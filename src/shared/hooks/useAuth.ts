import { useContext } from "react";
import { AuthContext, AuthContextType } from "../UI/AuthProvider";

export const useAuth = (): AuthContextType | null => {
  return useContext(AuthContext);
};
