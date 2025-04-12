import { useEffect, useState } from "react";
import ActressCard from "./components/ActressCard";
import ActorCard from "./components/ActorCard";
import "./App.css";

function App() {
  const [page, setPage] = useState(1); // 1 = attrici, 2 = attori
  const [people, setPeople] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  // 🎯 debounce effetto: attende 300ms dopo stop digitazione
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timeout); // pulizia timeout se si digita ancora
  }, [searchTerm]);

  // 🎬 carica i dati in base alla pagina
  const loadPage = () => {
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

  // carica ogni volta che cambia pagina
  useEffect(() => {
    console.log("🌀 useEffect attivato - Pagina corrente:", page);
    loadPage();
  }, [page]);

  // ➕ filtra persone in base al nome scritto
  const filteredPeople = people.filter((person) =>
    person.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );

  // BOTTONI prev / next
  const nextPage = () => {
    console.log("➡️ Funzione nextPage chiamata");
    setPage((prev) => Math.min(prev + 1, 2));
  };

  const prevPage = () => {
    console.log("⬅️ Funzione prevPage chiamata");
    setPage((prev) => Math.max(prev - 1, 1));
  };

  return (
    <>
      <h1 className="app-title">
        {page === 1 ? "🌟 Lista Attrici" : "🎭 Lista Attori"}
      </h1>

      <div className="pagination-buttons">
        <button onClick={prevPage} disabled={page === 1}>
          ⬅️ Prev
        </button>
        <span>Pagina {page}</span>
        <button onClick={nextPage} disabled={page === 2}>
          Next ➡️
        </button>
      </div>
      {/* 🔍 Campo ricerca */}
      <input
        className="search-input"
        type="text"
        placeholder="Cerca per nome..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        
      />
      


      <div className="app-container">

        
        
        {/* 🎥 Stampa card filtrate */}
        {filteredPeople.map((person) =>
          page === 1 ? (
            <ActressCard key={person.id} actress={person} />
          ) : (
            <ActorCard key={person.id} actor={person} />
          )
        )}

      </div>

      {/* 🔘 Bottoni di paginazione */}
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
