import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { login as loginRequest, register as registerRequest } from "../services/auth";
import { getMe } from "../services/users";
import type { LoginRequest, RegisterRequest, User } from "../types/user";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  login: (data: LoginRequest) => Promise<User>;
  register: (data: RegisterRequest) => Promise<User>;
  logout: () => void;
  setUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    getMe()
      .then(setUser)
      .catch(() => localStorage.removeItem("token"))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const handleUnauthorized = () => setUser(null);
    window.addEventListener("auth:unauthorized", handleUnauthorized);
    return () => window.removeEventListener("auth:unauthorized", handleUnauthorized);
  }, []);

  const login = async (data: LoginRequest) => {
    const response = await loginRequest(data);
    localStorage.setItem("token", response.token);
    const me = await getMe();
    setUser(me);
    return me;
  };

  const register = async (data: RegisterRequest) => {
    const response = await registerRequest(data);
    localStorage.setItem("token", response.token);
    const me = await getMe();
    setUser(me);
    return me;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
