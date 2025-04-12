// src/components/ActressCard.jsx
import React from "react";
import "./ActressCard.css"; // stile separato

export default function ActressCard({ actress }) {
  return (
    <div className="actress-card">
      <h2>{actress.name}</h2>
      <p><strong>Anno di nascita:</strong> {actress.birthyear}</p>
      <p><strong>Nazionalità:</strong> {actress.nationality}</p>
      <p><strong>Biografia:</strong> {actress.bio}</p>

      <img
        src={actress.image}
        alt={actress.name}
        className="actress-image"
      />

      <h4>🏆 Riconoscimenti:</h4>
      {Array.isArray(actress.awards) ? (
        <ul>
          {actress.awards.map((award, index) => (
            <li key={index}>{award}</li>
          ))}
        </ul>
      ) : (
        <p>Nessun premio trovato 🥲</p>
      )}
    </div>
  );
}
