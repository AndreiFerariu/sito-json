document.addEventListener("DOMContentLoaded", () => {
    // Ottieni il nome della pagina corrente
    const pageName = document.body.dataset.page;
  
    if (!pageName) {
      console.error("Il dataset 'page' non è definito nel body.");
      return;
    }
  
    // Carica il file JSON
    fetch("testo.json") // Assicurati che il file sia nella stessa directory
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Errore nel caricamento del JSON: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        if (!data[pageName]) {
          console.error(`Nessun contenuto trovato per la pagina: ${pageName}`);
          return;
        }
  
        // Aggiorna i testi della pagina
        document.getElementById("page-title").innerText = data[pageName].title || "";
        document.getElementById("page-description").innerText = data[pageName].description || "";
        document.getElementById("content").innerHTML = data[pageName].content || "";
  
        // Aggiorna le immagini
        const imageContainer = document.getElementById("images");
        if (imageContainer && data[pageName].images) {
          imageContainer.innerHTML = ""; // Pulisce il contenitore
          data[pageName].images.forEach((imageUrl) => {
            const img = document.createElement("img");
            img.src = imageUrl;
            img.alt = `Immagine per ${data[pageName].title}`;
            img.className = "img-fluid mt-3"; // Aggiungi classi Bootstrap
            imageContainer.appendChild(img);
          });
        }
      })
      .catch((error) => console.error("Errore:", error.message));
  });
  