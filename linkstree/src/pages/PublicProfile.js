import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import "./PublicProfile.css";
import { API_URL } from "../config";


export default function PublicProfile() {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Use your Render backend URL here
  const BASE_URL = "https://verselink-backend.onrender.com";

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/u/${username}`);
        setProfile(res.data);
      } catch (err) {
        console.error("Error loading profile:", err);
        setError("Profile not found 😢");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [username]);

  if (loading)
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading profile...</p>
      </div>
    );

  if (error || !profile)
    return <div className="error">{error || "Profile not found 😢"}</div>;

  return (
    <>
      <Navbar />

      <div className="public-profile">
        {/* 🧍 Profile Section */}
        <section className="profile-section">
          <img
            src={
              profile.avatar
                ? `${BASE_URL}${profile.avatar}`
                : "/default-avatar.png"
            }
            alt={`${profile.username}'s avatar`}
            className="profile-avatar"
          />
          <h2>@{profile.username}</h2>

          {/* 🔗 Links Section */}
          <section className="links-section">
            <h3 className="links-heading">My Links</h3>
            <div className="links-scroll">
              {profile.links && profile.links.length > 0 ? (
                profile.links.map((link) => (
                  <div key={link._id} className="link-card">
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
                ))
              ) : (
                <p className="no-links">No links added yet 😅</p>
              )}
            </div>
          </section>
        </section>
      </div>
    </>
  );
}
