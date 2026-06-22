import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Questionnaire from "./pages/Questionnaire";
import Results from "./pages/Results";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/questionario" element={<Questionnaire />} />
          <Route path="/resultados" element={<Results />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}