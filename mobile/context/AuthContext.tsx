import { getToken } from "@/utils/auth";
import React, { useCallback, useEffect, useState } from "react";

interface IAuthContext {
  isAuth: boolean;
  checkAuth: () => void;
}

const AuthContext = React.createContext<IAuthContext | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuth = useCallback(async () => {
    const token = await getToken("token");
    setIsAuthenticated(!!token);
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <AuthContext.Provider
      value={{
        checkAuth,
        isAuth: isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
