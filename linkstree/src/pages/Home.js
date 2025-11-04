import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  return (
    <div className="home-container">
      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Everything you are.<br />
            <span>In one simple link.</span>
          </h1>
          <p className="hero-subtitle">
            Share your content, social profiles, and everything you love — all from one personalized page.
          </p>
          <div className="hero-buttons">
            <Link to="/register" className="btn btn-primary">Get Started</Link>
            <Link to="/login" className="btn btn-secondary">Login</Link>
          </div>
        </div>
      </section>

      {/* FEATURE SECTION */}
      <section className="features-section">
        <h2 className="features-title">Why Choose Our🌐VerseLink?</h2>

        <div className="feature-cards">
          <div className="feature-card">
            <img
              src="https://images.unsplash.com/photo-1606788075761-3f46d8b2f9b1?auto=format&fit=crop&w=800&q=80"
              alt="Add Links"
              className="feature-img"
            />
            <h3>Add Unlimited Links</h3>
            <p>Share all your links in one beautiful, customizable page.</p>
          </div>

          <div className="feature-card">
            <img
              src="https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=800&q=80"
              alt="Customization"
              className="feature-img"
            />
            <h3>Customize Your Style</h3>
            <p>Choose backgrounds, themes, and icons that fit your vibe.</p>
          </div>

          <div className="feature-card">
            <img
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80"
              alt="Analytics"
              className="feature-img"
            />
            <h3>Track Your Visitors</h3>
            <p>Understand your audience and improve your reach.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
