/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const isLandingPage = location.pathname === "/";
  const navbarBg = isLandingPage
    ? scrolled
      ? "bg-white shadow-lg"
      : "bg-transparent"
    : "bg-white shadow-sm";

  const textColor = isLandingPage && !scrolled ? "text-white" : "text-sky-600";

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
      className={`fixed w-full z-50 ${navbarBg} transition-all duration-300`}
    >
      <div className="container flex items-center justify-between px-4 py-3 mx-auto">
        <Link to="/" className="flex items-center">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <span className={`text-xl md:text-2xl font-bold ${textColor}`}>
              PRIMA <span className="text-yellow-500">ODOO</span>
            </span>
          </motion.div>
        </Link>

        <div className="hidden space-x-8 md:flex">
          <NavLink to="/" textColor={textColor}>
            Beranda
          </NavLink>
          <NavLink to="/register" textColor={textColor}>
            Pendaftaran
          </NavLink>
        </div>

        <div className="md:hidden">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-full ${
              mobileMenuOpen
                ? "bg-white text-blue-600"
                : `${textColor} ${
                    isLandingPage && !scrolled
                      ? "bg-blue-600/20"
                      : "bg-gray-100"
                  }`
            }`}
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </motion.button>
        </div>
      </div>

      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-white shadow-lg md:hidden"
        >
          <div className="container flex flex-col px-4 py-4 mx-auto space-y-4">
            <MobileNavLink to="/">Beranda</MobileNavLink>
            <MobileNavLink to="/register">Pendaftaran</MobileNavLink>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

const NavLink = ({ to, children, textColor }) => {
  const location = useLocation();
  const isActive =
    location.pathname === to ||
    (to === "/register" && location.pathname.includes("/register"));

  return (
    <Link to={to}>
      <motion.div
        whileHover={{ y: -2 }}
        whileTap={{ y: 0 }}
        className="relative"
      >
        <span
          className={`font-medium ${isActive ? "text-yellow-500" : textColor}`}
        >
          {children}
        </span>
        {isActive && (
          <motion.div
            layoutId="navbar-underline"
            className="absolute bottom-[-5px] left-0 right-0 h-[3px] bg-yellow-500"
          />
        )}
      </motion.div>
    </Link>
  );
};

const MobileNavLink = ({ to, children }) => {
  const location = useLocation();
  const isActive =
    location.pathname === to ||
    (to === "/register" && location.pathname.includes("/register"));

  return (
    <Link to={to}>
      <motion.div
        whileTap={{ scale: 0.95 }}
        className={`py-2 px-4 rounded-md ${
          isActive ? "bg-sky-50 text-sky-600 font-medium" : "text-gray-700"
        }`}
      >
        {children}
      </motion.div>
    </Link>
  );
};

export default Navbar;
