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
        ereignis.preventDefault();
        sprungEingabeBehandeln();
    }
});

document.addEventListener('click', function(ereignis) {
    sprungEingabeBehandeln();
});

document.addEventListener('touchstart', function(ereignis) {
    ereignis.preventDefault();
    sprungEingabeBehandeln();
});

function sprungEingabeBehandeln() {
    if (!musikGestartet) {
        hintergrundMusikStarten();
        musikGestartet = true;
    }
    springen();
}

function hintergrundMusikStarten() {
    hintergrundMusik.volume = 0.3;
    hintergrundMusik.play().catch(fehler => {
        console.log('Konnte Hintergrundmusik nicht abspielen:', fehler);
    });
}

function springen() {
    if (springt || !spielLaeuft) return;
    springt = true;
    dino.classList.add('jump');
    setTimeout(() => {
        dino.classList.remove('jump');
        springt = false;
    }, 800);
}

function kollisionPruefen() {
    const dinoRechteck = dino.getBoundingClientRect();
    const kaktusRechteck = kaktus.getBoundingClientRect();
    if (dinoRechteck.right > kaktusRechteck.left && 
        dinoRechteck.left < kaktusRechteck.right && 
        dinoRechteck.bottom > kaktusRechteck.top) {
        spielEnde();
    }
}

function spielEnde() {
    spielLaeuft = false;
    spielEndeAnzeige.style.display = 'block';
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
    hintergrundMusik.currentTime = 0;
    hintergrundMusik.play().catch(fehler => {
        console.log('Konnte Hintergrundmusik nicht neu starten:', fehler);
    });
}

function punkteAktualisieren() {
    if (spielLaeuft) {
        punkte++;
        punkteAnzeige.textContent = 'Punkte: ' + punkte;
        if (punkte % 100 === 0) {
            spielBeschleunigen();
        }
    }
}

function spielBeschleunigen() {
    const geschwindigkeitsLevel = Math.floor(punkte / 100);
    const neueGeschwindigkeit = Math.max(0.8, 2 - (geschwindigkeitsLevel * 0.2));
    wartendeGeschwindigkeit = neueGeschwindigkeit;
}

function kaktusGeschwindigkeitAnwenden() {
    if (wartendeGeschwindigkeit !== null) {
        aktuelleGeschwindigkeit = wartendeGeschwindigkeit;
        wartendeGeschwindigkeit = null;
    }
    kaktus.style.animation = 'none';
    kaktus.offsetHeight;
    kaktus.style.animationDuration = aktuelleGeschwindigkeit + 's';
    kaktus.style.animation = 'moveCactus ' + aktuelleGeschwindigkeit + 's linear infinite';
}

setInterval(() => {
    if (spielLaeuft) {
        kollisionPruefen();
        punkteAktualisieren();
    }
}, 100);
