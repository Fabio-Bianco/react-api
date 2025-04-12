// src/components/ActorCard.jsx
import React from "react";
import "./ActressCard.css"; // possiamo riutilizzare lo stesso stile

export default function ActorCard({ actor }) {
    return (

        <>
            <div className="actress-card">
                <h2>{actor.name}</h2>
                <p><strong>Anno di nascita:</strong> {actor.birthyear}</p>
                <p><strong>Nazionalità:</strong> {actor.nationality}</p>
                <p><strong>Biografia:</strong> {actor.bio}</p>

                <img
                    src={actor.image}
                    alt={actor.name}
                    className="actress-image"
                />

                <h4>🏆 Riconoscimenti:</h4>
                {Array.isArray(actor.awards) ? (
                    <ul>
                        {actor.awards.map((award, index) => (
                            <li key={index}>{award}</li>
                        ))}
                    </ul>
                ) : (
                    <p>Nessun premio trovato 🥲</p>
                )}
            </div>
        </>
    );

}
