import { useEffect, useState } from "react";
import ActressCard from "./components/ActressCard";
import ActorCard from "./components/ActorCard"; // ti spiego sotto com’è
import "./App.css";

function App() {
  const [page, setPage] = useState(1);
  const [people, setPeople] = useState([]); // può essere attrici o attori

  // carica in base alla pagina attuale
  const loadPeople = () => {
    const url =
      page === 1
        ? "https://www.freetestapi.com/api/v1/actresses"
        : "https://www.freetestapi.com/api/v1/actors";

    console.log("📡 Fetch verso:", url);

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log("🧾 Dati ricevuti:", data);
        setPeople(data);
      })
      .catch((err) => console.error("Errore nel fetch:", err));
  };

  // aggiorna i dati quando cambia pagina
  useEffect(() => {
    console.log("🌀 useEffect attivato - Pagina corrente:", page);
    loadPeople();
  }, [page]);

  // bottoni
  const nextPage = () => {
    console.log("➡️ Funzione nextPage chiamata");
    setPage((prev) => Math.min(prev + 1, 2)); // limitiamo a max 2 pagine
  };

  const prevPage = () => {
    console.log("⬅️ Funzione prevPage chiamata");
    setPage((prev) => Math.max(prev - 1, 1)); // min 1
  };

  return (
  <>
    <h1 className="app-title">
    {page === 1 ? " Lista Attrici " : " Lista Attori "}
  </h1>

    <div className="app-container">

      {/* Mostra card diverse in base alla pagina */}
      {people.map((person) =>
        page === 1 ? (
          <ActressCard key={person.id} actress={person} />
        ) : (
          <ActorCard key={person.id} actor={person} />
        )
      )}
    </div>
    {/* 🔘 BOTTONI PER CAMBIARE PAGINA */}
    <div className="pagination-buttons">
        <button onClick={prevPage} disabled={page === 1}>
          ⬅️ Prev
        </button>
        <span>Pagina {page}</span>
        <button onClick={nextPage} disabled={page === 2}>
          Next ➡️
        </button>
      </div>
    </>
  );
  
}

export default App;
