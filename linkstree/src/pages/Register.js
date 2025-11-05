import React, { useState } from "react";
import axios from "axios";
import "./Register.css";
import { API_URL } from "../config";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleRegister = async () => {
    try {
      if (!username || !email || !password || !photo) {
        return setMessage("⚠️ Please fill all fields and upload a photo");
      }

      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("photo", photo);

      const res = await axios.post(`${API_URL}/api/auth/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      setMessage(`✅ ${res.data.message}`);
      console.log("Registered user:", res.data);

      // ✅ Optional: redirect after success
      setTimeout(() => navigate("/dashboard"), 800);
    } catch (err) {
      console.error("❌ Registration error:", err.response?.data || err.message);
      setMessage("❌ " + (err.response?.data?.message || "Registration failed"));
    }
  };

  return (
    <div className="register-container">
      <h2>Create Account</h2>
      <div className="photo-section">
        {preview ? (
          <img src={preview} alt="Preview" className="photo-preview" />
        ) : (
          <div className="photo-placeholder">📷</div>
        )}
        <label className="photo-upload-btn">
          Upload Photo
          <input type="file" accept="image/*" onChange={handlePhotoChange} hidden />
        </label>
      </div>

      <input
        type="text"
        placeholder="Full Name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleRegister}>Register</button>
      {message && <p className="status-msg">{message}</p>}

      <button className="google-btn">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
          alt="Google"
        />
        Register with Google
      </button>
    </div>
  );
}
