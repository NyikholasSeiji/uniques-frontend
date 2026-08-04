import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import AuthGate from "./components/AuthGate";
import LandingPage from "./pages/LandingPage";
import Questionnaire from "./pages/Questionnaire";
import Results from "./pages/Results";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";

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
                <AuthGate require="anonymous">
                  <Login />
                </AuthGate>
              }
            />
            <Route
              path="/registro"
              element={
                <AuthGate require="anonymous">
                  <Register />
                </AuthGate>
              }
            />
            <Route
              path="/perfil"
              element={
                <AuthGate require="authenticated">
                  <Profile />
                </AuthGate>
              }
            />
            <Route
              path="/admin"
              element={
                <AuthGate require="admin">
                  <Admin />
                </AuthGate>
              }
            />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}
