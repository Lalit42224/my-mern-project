import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "./Dashboard.css";
import axios from "axios";
import { API_URL } from "../config";

export default function Dashboard() {
  const [links, setLinks] = useState([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);

  axios.defaults.withCredentials = true;
  useEffect(() => {
   const fetchUser = async () => {
  try {
    const res = await axios.get(`${API_URL}/api/auth/check`);
    if (res.data.authenticated) {
      setUser(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user)); // ✅ added line
    } else {
      localStorage.removeItem("user");
    }
  } catch {
    setUser(null);
    localStorage.removeItem("user");
  }
};
    const fetchLinks = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/links/my-links`);
        setLinks(res.data);
      } catch {
        setMessage("⚠️ Failed to load links. Please log in again.");
      }
    };

    fetchUser();
    fetchLinks();
  }, []);

  const addLink = async () => {
    if (!title || !url) return setMessage("Please fill all fields");
    try {
      await axios.post(`${API_URL}/api/links/add`, { title, url });
      setMessage("✅ Link added!");
      setTitle("");
      setUrl("");
      const res = await axios.get(`${API_URL}/api/links/my-links`);
      setLinks(res.data);
    } catch {
      setMessage("❌ Failed to add link");
    }
  };

  const deleteLink = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/links/delete/${id}`);
      setMessage("🗑️ Link deleted");
      const res = await axios.get(`${API_URL}/api/links/my-links`);
      setLinks(res.data);
    } catch {
      setMessage("❌ Failed to delete");
    }
  };

  const shareProfile = async () => {
    if (!user) return setMessage("⚠️ Login first!");
    const shareUrl = `${window.location.origin}/u/${user.username}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setMessage("🔗 Profile link copied!");
    } catch {
      setMessage("❌ Could not copy link.");
    }
  };

  return (
    <div>
      <Navbar />

      {/* ✅ Profile Section */}
      {user && (
        <div className="profile-section">
          <img
            src={`${API_URL}${user.avatar || "/uploads/default.png"}`}
            alt="Profile"
            className="profile-avatar"
          />
          <h3 className="profile-name">Welcome, {user.username} 👋</h3>
          <button onClick={shareProfile} className="share-btn">
            🔗 Share Profile
          </button>
        </div>
      )}

      {/* ✅ Dashboard Section */}
      <div className="dashboard-main">
        <h2>Your Dashboard</h2>
        <p className="subtitle">✨ Manage all your links</p>

        <div className="link-form">
          <input
            type="text"
            placeholder="Link title (e.g. Instagram)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Link URL (https://...)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button onClick={addLink} className="add-btn">
            ➕ Add Link
          </button>
        </div>

        {message && <p className="status-msg">{message}</p>}

        <div className="links-wrapper">
          {links.length ? (
            links.map((link) => (
              <div key={link._id} className="link-card">
                <div className="link-info">
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-title"
                  >
                    {link.title}
                  </a>
                  <p className="link-url">{link.url}</p>
                </div>
                <button
                  className="delete-btn"
                  onClick={() => deleteLink(link._id)}
                >
                  ✖
                </button>
              </div>
            ))
          ) : (
            <p className="no-links">No links yet — add one!</p>
          )}
        </div>
      </div>
    </div>
  );
}
