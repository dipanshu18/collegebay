import AuthContext from "@/context/AuthContext";
import { useContext } from "react";

export default function useAuth() {
  const authContext = useContext(AuthContext);

  if (authContext === undefined) {
    throw new Error("Auth Context must be used inside Auth Provider");
  }

  return authContext;
}
