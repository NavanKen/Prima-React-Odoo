import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";
import "./App.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage";
import GuruRegisterPage from "./pages/GuruRegisterPage";
import SiswaRegisterPage from "./pages/SiswaRegisterPage";
import StafRegisterPage from "./pages/StafRegisterPage";
import SuccessPage from "./pages/SuccessPage";
import ErrorPage from "./pages/ErrorPage";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/register/guru" element={<GuruRegisterPage />} />
            <Route path="/register/siswa" element={<SiswaRegisterPage />} />
            <Route path="/register/staf" element={<StafRegisterPage />} />
            <Route path="/register/success" element={<SuccessPage />} />
            <Route path="/register/error" element={<ErrorPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
