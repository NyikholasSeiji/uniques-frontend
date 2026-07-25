import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicOnlyRoute from "./components/PublicOnlyRoute";
import LandingPage from "./pages/LandingPage";
import Questionnaire from "./pages/Questionnaire";
import Results from "./pages/Results";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/questionario" element={<Questionnaire />} />
            <Route path="/resultados" element={<Results />} />
            <Route
              path="/login"
              element={
                <PublicOnlyRoute>
                  <Login />
                </PublicOnlyRoute>
              }
            />
            <Route
              path="/registro"
              element={
                <PublicOnlyRoute>
                  <Register />
                </PublicOnlyRoute>
              }
            />
            <Route
              path="/perfil"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}
