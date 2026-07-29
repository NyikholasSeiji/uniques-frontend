import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoadingScreen from "./LoadingScreen";

interface AuthGateProps {
  children: ReactNode;
  /** "authenticated" só permite acesso logado; "anonymous" só permite acesso deslogado. */
  require: "authenticated" | "anonymous";
}

const AuthGate = ({ children, require }: AuthGateProps) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  if (require === "authenticated" && !user) {
    return <Navigate to="/login" replace />;
  }

  if (require === "anonymous" && user) {
    return <Navigate to="/perfil" replace />;
  }

  return <>{children}</>;
};

export default AuthGate;
