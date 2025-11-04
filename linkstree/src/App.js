import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PublicProfile from "./pages/PublicProfile"; // ✅ new
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

function App() {
  return React.createElement(
    Router,
    null,
    React.createElement(
      "div",
      {
        className:
          "min-h-screen bg-gradient-to-b from-purple-900 via-black to-gray-900 text-white",
      },
      [
        React.createElement(Navbar, { key: "navbar" }),
        React.createElement(
          Routes,
          { key: "routes" },
          [
            React.createElement(Route, {
              key: "home",
              path: "/",
              element: React.createElement(Home),
            }),
            React.createElement(Route, {
              key: "register",
              path: "/register",
              element: React.createElement(Register),
            }),
            React.createElement(Route, {
              key: "login",
              path: "/login",
              element: React.createElement(Login),
            }),
            React.createElement(Route, {
              key: "dashboard",
              path: "/dashboard",
              element: React.createElement(
                ProtectedRoute,
                null,
                React.createElement(Dashboard)
              ),
            }),
            // ✅ New route for public VerseLink profile
            React.createElement(Route, {
              key: "publicProfile",
              path: "/u/:username",
              element: React.createElement(PublicProfile),
            }),
          ]
        ),
      ]
    )
  );
}

export default App;
