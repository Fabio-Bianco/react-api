// App.jsx
import { useEffect } from 'react';

function App() {
  // useEffect viene eseguito una sola volta al caricamento del componente
  useEffect(() => {
    console.log("App caricata!");

    // Eseguiamo il fetch verso l'API degli attori
    fetch('https://www.freetestapi.com/api/v1/actresses')
      .then((res) => {
        console.log("Risposta ricevuta! Ora la trasformo in JSON...");
        return res.json(); // trasformiamo la risposta in JSON
      })
      .then((data) => {
        console.log("Lista attori ricevuta! 🎬");
        console.log(data); // stampiamo i dati in console
      })
      .catch((error) => {
        console.log("Errore nel recupero dati ", error);
      });
  }, []); // [] significa che useEffect si esegue solo una volta, all'inizio

  return (
    <div>
      <h1>Lista Attori</h1>
      <p>Apri la console per vedere i dati!</p>
    </div>
  );
}

export default App;
