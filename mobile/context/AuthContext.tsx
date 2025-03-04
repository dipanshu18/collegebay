import { login, logout } from "@/api/mutations";
import { deleteValue, getValue } from "@/utils/secure-store";
import { createContext, useCallback, useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface IAuthContext {
  isAuth: boolean;
  login: ({ email, password }: { email: string; password: string }) => void;
  logout: () => void;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  function checkAuth() {
    const token = getValue("token");
    setIsAuthenticated(!!token);
    setLoading(false);
  }

  async function loginUser({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    setLoading(true);
    await login({ email, password });
    setIsAuthenticated(true);
    setLoading(false);
  }

  async function logoutUser() {
    setLoading(true);
    await logout();
    await deleteValue("token");
    await deleteValue("uid");
    setIsAuthenticated(false);
    setLoading(false);
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuth: isAuthenticated,
        login: loginUser,
        logout: logoutUser,
      }}
    >
      {loading ? (
        <SafeAreaView
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator />
        </SafeAreaView>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}

export default AuthContext;
