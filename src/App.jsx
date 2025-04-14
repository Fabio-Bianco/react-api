// src/App.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import ActressCard from "./components/ActressCard";
import ActorCard from "./components/ActorCard";
import "./App.css";

// Componente principale dell'app
const App = () => {
  // Stato per controllare se siamo su "attrici" (1) o "attori" (2)
  const [page, setPage] = useState(1);

  // Stato che contiene i dati restituiti dall'API (lista persone)
  const [people, setPeople] = useState([]);

  // Stato per input della ricerca (quello che l'utente scrive)
  const [searchTerm, setSearchTerm] = useState("");

  // Stato per applicare il debounce (ritardo applicazione del filtro)
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  // Effetto per ritardare l'aggiornamento della ricerca di 300ms
  useEffect(() => {
    const timeout = setTimeout(() => {
      console.log("🔍 Debounce aggiornato:", searchTerm);
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => {
      console.log("⌛ Timeout precedente cancellato");
      clearTimeout(timeout);
    };
  }, [searchTerm]);

  // Funzione per caricare i dati da API in base alla pagina selezionata
  const loadPage = () => {
    const url =
      page === 1
        ? "https://www.freetestapi.com/api/v1/actresses"
        : "https://www.freetestapi.com/api/v1/actors";

    console.log("📡 Caricamento dati da URL:", url);

    axios
      .get(url)
      .then((res) => {
        console.log("✅ Dati ricevuti:", res.data);
        setPeople(res.data);
      })
      .catch((err) => {
        console.error("❌ Errore nel caricamento:", err);
      });
  };

  // Carica dati ogni volta che cambia la pagina (attori o attrici)
  useEffect(() => {
    console.log("🔄 Effetto attivato: pagina cambiata →", page);
    loadPage();
  }, [page]);

  // Funzione per andare alla pagina successiva
  const nextPage = () => {
    console.log("➡️ Vai alla pagina successiva");
    setPage((prev) => Math.min(prev + 1, 2));
  };

  // Funzione per tornare alla pagina precedente
  const prevPage = () => {
    console.log("⬅️ Torna alla pagina precedente");
    setPage((prev) => Math.max(prev - 1, 1));
  };

  // Filtra i dati in base al termine cercato
  const filteredPeople = people.filter((person) =>
    person.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );

  console.log("👥 Persone filtrate:", filteredPeople);

  return (
    <>
<h1
  className={`app-title ${page === 1 ? "attrici-title" : "attori-title"}`}
>
  {page === 1 ? "Lista Attrici" : "Lista Attori"}
</h1>


      <div className="search">
        <div className="pagination-buttons">
          <button onClick={prevPage} disabled={page === 1}>
            Pagina precedente
          </button>
          <span>Pagina {page}</span>
          <button onClick={nextPage} disabled={page === 2}>
            Pagina successiva
          </button>
        </div>

        <input
          className="search-input"
          type="text"
          placeholder="Cerca per nome..."
          value={searchTerm}
          onChange={(e) => {
            console.log("⌨️ Input cambiato:", e.target.value);
            setSearchTerm(e.target.value);
          }}
        />
      </div>

      <div className="app-container">
        {filteredPeople.map((person) =>
          page === 1 ? (
            <ActressCard key={person.id} actress={person} />
          ) : (
            <ActorCard key={person.id} actor={person} />
          )
        )}
      </div>

      {filteredPeople.length === 0 && (
        <p className="no-results">Nessun risultato trovato</p>
      )}

      {filteredPeople.length > 0 && (
        <p className="results-found">
          Risultati trovati: {filteredPeople.length}
        </p>
      )}
    </>
  );
};

export default App;
