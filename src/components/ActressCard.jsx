// src/components/ActressCard.jsx
import React from "react";
import "./ActressCard.css";

const ActressCard = ({ actress }) => {
  console.log("👩‍🎤 Attrice ricevuta:", actress);

  const {
    name,
    birth_year,
    nationality,
    image,
    awards,
    biography,
    most_famous_movies,
  } = actress;

  return (
    <div className="actress-card">
      <h2>{name}</h2>
      <p><strong>Anno di nascita:</strong> {birth_year}</p>
      <p><strong>Nazionalità:</strong> {nationality}</p>
      <p><strong>Biografia:</strong> {biography}</p>
      <img src={image} alt={name} className="actress-image" />
      <h4>Riconoscimenti:</h4>
      <p>{awards || "Nessun premio disponibile"}</p>
      <h4>Film più famosi:</h4>
      {Array.isArray(most_famous_movies) && most_famous_movies.length > 0 ? (
        <ul>
          {most_famous_movies.map((movie, index) => (
            <li key={index}>{movie}</li>
          ))}
        </ul>
      ) : (
        <p>Nessun film famoso disponibile</p>
      )}
    </div>
  );
};

export default ActressCard;
