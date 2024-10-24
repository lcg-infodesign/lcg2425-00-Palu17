let angle; // Variabile per l'angolo
let angles = []; // Array per memorizzare gli angoli
let offsets = []; // Array per memorizzare gli offset

function preload() {
  // Codice da eseguire prima di setup
}

function setup() {
  createCanvas(400*2, 249*2); // Crea una tela di dimensioni specificate
  angle = random(TWO_PI); // Genera un angolo casuale

  let totalRects = 34 * 20; // Calcola il numero totale di rettangoli
  let cols = 34; // Numero di colonne
  let rows = 20; // Numero di righe
  let centerX = cols / 2; // Trova la colonna centrale
  let centerY = rows / 2; // Trova la riga centrale

  for (let j = 0; j < rows; j++) { // Ciclo attraverso le righe
    for (let i = 0; i < cols; i++) { // Ciclo attraverso le colonne
      // Se il rettangolo è ai bordi, l'angolo è 0
      if (i === 0 || i === cols - 1 || j === 0 || j === rows - 1) {
        angles[j * cols + i] = 0; // Imposta angolo a 0 per i bordi
        offsets[j * cols + i] = { x: 0, y: 0 }; // Nessun offset per i bordi
      } else {
        // Calcola la distanza dal centro
        let distanceFromCenter = dist(i, j, centerX, centerY);
        // Mappa la distanza a un angolo massimo
        let maxAngle = map(distanceFromCenter, 0, dist(0, 0, centerX, centerY), PI / 4, 0); 
        // Genera un angolo casuale per i rettangoli interni
        angles[j * cols + i] = random(-maxAngle, maxAngle); 
        
        // Aggiungi un offset se il rettangolo è vicino al centro
        if (distanceFromCenter < 5) { // Controlla se è vicino al centro
          offsets[j * cols + i] = { 
            x: random(-10, 10), // Offset casuale per x
            y: random(-10, 10)  // Offset casuale per y
          };
        } else {
          offsets[j * cols + i] = { x: 0, y: 0 }; // Nessun offset per i rettangoli lontani
        }
      }
    }
  }
}

function draw() {
  background("white"); // Imposta lo sfondo bianco
  
  let rectSize = Math.min(width, height) / 34 * 1.50; // Calcola la dimensione del rettangolo
  let cols = 34; // Numero di colonne
  let rows = 20; // Numero di righe
  let x = (width - cols * rectSize) / 2; // Calcola la posizione x
  let y = (height - rows * rectSize) / 2; // Calcola la posizione y

  let centerX = cols / 2; // Trova la colonna centrale
  let centerY = rows / 2; // Trova la riga centrale

  let index = 0; // Indice per accedere agli angoli
  for (let j = 0; j < rows; j++) { // Ciclo attraverso le righe
    for (let i = 0; i < cols; i++) { // Ciclo attraverso le colonne
      // Calcola la distanza dal centro
      let distanceFromCenter = dist(i, j, centerX, centerY);
      // Mappa la distanza a un angolo
      let maxAngle = map(distanceFromCenter, 0, dist(0, 0, centerX, centerY), PI / 4, 0); 
      // Usa l'angolo dall'array
      let angle = angles[index]; 
      
      push(); // Salva lo stato corrente
      translate(x + i * rectSize + rectSize / 2 + offsets[index].x, y + j * rectSize + rectSize / 2 + offsets[index].y); // Trasla il punto di origine
      rotate(angle); // Ruota il rettangolo
      
      // Disegna il rettangolo
      noFill(); // Disabilita il riempimento
      stroke("black"); // Imposta il colore del bordo
      rect(-rectSize / 2, -rectSize / 2, rectSize, rectSize); // Disegna il rettangolo centrato
      
      pop(); // Ripristina lo stato precedente
      index++; // Incrementa l'indice per il prossimo rettangolo
    }
  }
}
