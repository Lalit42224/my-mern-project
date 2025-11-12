import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./Navbar.css";
import { API_URL } from "../config";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ✅ Detect public profile & home routes
  const isPublicProfile = location.pathname.startsWith("/u/");
  const isHomePage = location.pathname === "/";

  // ✅ Check login status from localStorage
  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, [location]);

  const handleLogout = async () => {
    try {
      await axios.post(API_URL + "/api/auth/logout", {}, { withCredentials: true });
      localStorage.removeItem("user"); // ✅ Clear login info
      setIsLoggedIn(false);
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="nav-logo">
          <span className="logo-icon">🌐</span>
          <span className="logo-text">VerseLink</span>
        </Link>
      </div>

      <div className="nav-right">
        {/* ✅ Always show Home */}
        <Link to="/">Home</Link>

        {/* ✅ If logged in → show Dashboard & Logout */}
        {isLoggedIn && !isPublicProfile && (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </>
        )}

        {/* ✅ If NOT logged in → show Login & Register */}
        {!isLoggedIn && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
