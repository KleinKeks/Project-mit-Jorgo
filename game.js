const dino = document.getElementById('dino');
const kaktus = document.getElementById('cactus');
const punkteAnzeige = document.getElementById('score');
const spielEndeAnzeige = document.getElementById('gameOver');
const hintergrundMusik = document.getElementById('backgroundMusic');
const spielEndeSound = document.getElementById('gameOverSound');

let punkte = 0;
let springt = false;
let spielLaeuft = true;
let musikGestartet = false;
let aktuelleGeschwindigkeit = 2;
let wartendeGeschwindigkeit = null;

document.addEventListener('keydown', function(ereignis) {
    if (ereignis.code === 'Space') {
        ereignis.preventDefault(); // Verhindert Seitenscrollen bei Leertaste
        sprungEingabeBehandeln();
    }
});

document.addEventListener('click', function(ereignis) {
    sprungEingabeBehandeln();
});

// TouchStart für bessere Mobile-Unterstützung (reagiert schneller als Click)
document.addEventListener('touchstart', function(ereignis) {
    ereignis.preventDefault(); // Verhindert Zoom/Scroll auf Mobile
    sprungEingabeBehandeln();
});

function sprungEingabeBehandeln() {
    // Musik muss durch User-Interaktion gestartet werden (Browser-Sicherheit)
    if (!musikGestartet) {
        hintergrundMusikStarten();
        musikGestartet = true;
    }
    springen();
}

function hintergrundMusikStarten() {
    hintergrundMusik.volume = 0.3;
    // .catch() fängt Fehler ab falls Browser Autoplay blockiert
    hintergrundMusik.play().catch(fehler => {
        console.log('Konnte Hintergrundmusik nicht abspielen:', fehler);
    });
}

function springen() {
    // Guard Clause - verhindert mehrere Sprünge gleichzeitig
    if (springt || !spielLaeuft) return;
    
    springt = true;
    dino.classList.add('jump');
    
    // setTimeout führt Code nach bestimmter Zeit aus (hier 800ms) bestimmt wie lange er in der luft it
    setTimeout(() => {
        dino.classList.remove('jump');
        springt = false;
    }, 800);
}

function kollisionPruefen() {
    // getBoundingClientRect() gibt Position und Größe des Elements zurück
    const dinoRechteck = dino.getBoundingClientRect();
    const kaktusRechteck = kaktus.getBoundingClientRect();
    
    // AABB Collision Detection (Axis-Aligned Bounding Box)
    // Prüft ob zwei Rechtecke sich überlappen
    if (dinoRechteck.right > kaktusRechteck.left && 
        dinoRechteck.left < kaktusRechteck.right && 
        dinoRechteck.bottom > kaktusRechteck.top) {
        spielEnde();
    }
}

function spielEnde() {
    spielLaeuft = false;
    spielEndeAnzeige.style.display = 'block';
    // animationPlayState pausiert CSS-Animation ohne Position zu ändern
    kaktus.style.animationPlayState = 'paused';
    
    hintergrundMusik.pause();
    spielEndeSound.volume = 0.5;
    spielEndeSound.play().catch(fehler => {
        console.log('Konnte Spiel-Ende-Sound nicht abspielen:', fehler);
    });
}

function spielNeustarten() {
    spielLaeuft = true;
    punkte = 0;
    aktuelleGeschwindigkeit = 2;
    wartendeGeschwindigkeit = null;
    punkteAnzeige.textContent = 'Score: 0';
    spielEndeAnzeige.style.display = 'none';
    
    kaktusGeschwindigkeitAnwenden();
    
    // currentTime = 0 setzt Audio an den Anfang zurück
    hintergrundMusik.currentTime = 0;
    hintergrundMusik.play().catch(fehler => {
        console.log('Konnte Hintergrundmusik nicht neu starten:', fehler);
    });
}

function punkteAktualisieren() {
    if (spielLaeuft) {
        punkte++;
        punkteAnzeige.textContent = 'Score: ' + punkte;
        
        // Modulo (%) gibt den Rest einer Division zurück
        // 100 % 100 = 0, 200 % 100 = 0, etc.
        if (punkte % 100 === 0) {
            spielBeschleunigen();
        }
    }
}

function spielBeschleunigen() {
    // Math.floor() rundet ab: 150/100 = 1.5 → 1
    const geschwindigkeitsLevel = Math.floor(punkte / 100);
    
    // Math.max() verhindert dass Wert unter Minimum fällt
    // Geschwindigkeit wird schneller (kleinere Zahl = schnellere Animation)
    const neueGeschwindigkeit = Math.max(0.8, 2 - (geschwindigkeitsLevel * 0.2));
    
    // Speichern statt direkt anwenden verhindert Positions-Glitches
    wartendeGeschwindigkeit = neueGeschwindigkeit;
}

function kaktusGeschwindigkeitAnwenden() {
    if (wartendeGeschwindigkeit !== null) {
        aktuelleGeschwindigkeit = wartendeGeschwindigkeit;
        wartendeGeschwindigkeit = null;
    }
    
    // Animation komplett zurücksetzen (3-Schritt-Prozess):
    kaktus.style.animation = 'none';           // 1. Animation stoppen
    kaktus.offsetHeight;                       // 2. Browser-Reflow erzwingen
    kaktus.style.animationDuration = aktuelleGeschwindigkeit + 's'; // 3a. Neue Dauer
    kaktus.style.animation = 'moveCactus ' + aktuelleGeschwindigkeit + 's linear infinite'; // 3b. Neu starten
}

// setInterval() führt Funktion wiederholt alle X Millisekunden aus
setInterval(() => {
    if (spielLaeuft) {
        kollisionPruefen();
        punkteAktualisieren();
    }
}, 100); // Alle 100ms = 10 FPS

// Für Animations-Ereignisse (manuell zu HTML hinzufügen):
// kaktus.addEventListener('animationiteration', function() {
//     if (spielLaeuft) {
//         kaktusGeschwindigkeitAnwenden();
//     }
// });