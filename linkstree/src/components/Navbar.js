import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./Navbar.css";
import { API_URL } from "../config";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Detect public profile route
  const isPublicProfile = location.pathname.startsWith("/u/");

  const handleLogout = async () => {
    try {
      await axios.post(`${API_URL}/api/auth/logout`, {}, { withCredentials: true });
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
        <Link to="/">Home</Link>
        {!isPublicProfile && <Link to="/dashboard">Dashboard</Link>}
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        {!isPublicProfile && (
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
