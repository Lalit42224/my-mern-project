import React, { useState } from "react";
import axios from "axios";
import "./Register.css";
import { API_URL } from "../config";


export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState("");
  const [message, setMessage] = useState("");

  // 📸 Handle photo selection + preview
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

      // 🧾 Prepare FormData
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("photo", photo); // must match upload.single("photo")

      // 📨 Send POST request to live backend
      const res = await axios.post(
        `${API_URL}/api/auth/register`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      setMessage(`✅ ${res.data.message}`);
      console.log("Registered user:", res.data);
    } catch (err) {
      console.error("❌ Registration error:", err.response?.data || err.message);
      setMessage("❌ " + (err.response?.data?.message || "Registration failed"));
    }
  };

  return (
    <div className="register-container">
      <h2>Create Account</h2>

      {/* Photo Upload Section */}
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

      {/* Input Fields */}
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

      {/* Optional Google Signup */}
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
