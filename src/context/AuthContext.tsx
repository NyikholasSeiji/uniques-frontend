import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import api from "../services/api";
import { login as loginRequest, register as registerRequest } from "../services/auth";
import { getMe } from "../services/users";
import type { AuthResponse, LoginRequest, RegisterRequest, User } from "../types/user";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  login: (data: LoginRequest) => Promise<User>;
  register: (data: RegisterRequest) => Promise<User>;
  logout: () => void;
  setUser: (user: User) => void;
  refreshUser: () => Promise<User>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(() => !!localStorage.getItem("token"));

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      return;
    }

    getMe()
      .then(setUser)
      .catch(() => localStorage.removeItem("token"))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const interceptorId = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401 && localStorage.getItem("token")) {
          localStorage.removeItem("token");
          setUser(null);
        }
        return Promise.reject(error);
      }
    );
    return () => api.interceptors.response.eject(interceptorId);
  }, []);

  const authenticate = useCallback(
    async <T,>(request: (data: T) => Promise<AuthResponse>, data: T): Promise<User> => {
      const response = await request(data);
      localStorage.setItem("token", response.token);
      const me = await getMe();
      setUser(me);
      return me;
    },
    []
  );

  const login = useCallback(
    (data: LoginRequest) => authenticate(loginRequest, data),
    [authenticate]
  );

  const register = useCallback(
    (data: RegisterRequest) => authenticate(registerRequest, data),
    [authenticate]
  );

  const refreshUser = useCallback(async (): Promise<User> => {
    const me = await getMe();
    setUser(me);
    return me;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, loading, login, register, logout, setUser, refreshUser }),
    [user, loading, login, register, logout, refreshUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
