import { BrowserRouter, Routes, Route } from "react-router-dom"
import LandingPage from "./pages/LandingPage"

// Pequeño ayudante para saltar a la app real
const RedirectToApp = ({ path = "" }) => {
  window.location.href = `https://app.itopy.ai${path}`;
  return null;
};

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* Redirecciones automáticas hacia la App */}
        <Route path="/login" element={<RedirectToApp path="/login" />} />
        <Route path="/register" element={<RedirectToApp path="/register" />} />
        <Route path="/dashboard" element={<RedirectToApp path="/dashboard" />} />
      </Routes>
    </BrowserRouter>
  )
}
