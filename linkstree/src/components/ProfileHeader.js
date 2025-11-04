import React from "react";
import "./ProfileHeader.css";

function ProfileHeader() {
  return (
    <div className="text-center mt-32 fade-in">
      <img
        src="https://i.ibb.co/0mZ4C1S/avatar.png"
        alt="profile"
        className="w-28 h-28 rounded-full mx-auto border-4 border-pink-500 glow"
      />
      <h2 className="text-2xl font-semibold mt-4">Lalit Sharma</h2>
      <p className="text-gray-300">💻 Developer | 🚀 Dreamer | 🎨 Creator</p>
    </div>
  );
}

export default ProfileHeader;
