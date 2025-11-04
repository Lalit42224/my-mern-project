import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Detect if the current page is a public profile like /u/username
  const isPublicProfile = location.pathname.startsWith("/u/");

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/logout", {}, { withCredentials: true });
      localStorage.removeItem("token");
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
        {/* ✅ Hide Dashboard on public profile */}
        {!isPublicProfile && <Link to="/dashboard">Dashboard</Link>}
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>

        {/* ✅ Hide Logout button on public profile */}
        {!isPublicProfile && (
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
