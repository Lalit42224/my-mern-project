import React from "react";
import "./LinkCard.css";

function LinkCard({ title, url, icon }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="card-glass w-full md:w-1/2 mx-auto mt-6 p-5 flex items-center gap-4 hover:scale-105"
    >
      <span className="text-3xl">{icon}</span>
      <span className="text-lg font-medium">{title}</span>
    </a>
  );
}

export default LinkCard;
