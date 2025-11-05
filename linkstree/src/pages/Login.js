import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
import { API_URL } from "../config";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${API_URL}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );

      setMessage("✅ Login successful!");
      console.log("User Data:", res.data);

      // Redirect after short delay
      setTimeout(() => navigate("/dashboard"), 800);
    } catch (err) {
      const msg = err.response?.data?.message || "❌ Invalid email or password";
      setMessage(msg);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      {message && <p>{message}</p>}
    </div>
  );
}
