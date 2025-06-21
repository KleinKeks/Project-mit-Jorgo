// Warte bis die komplette Webseite geladen ist
document.addEventListener('DOMContentLoaded', function() {
    
    // Finde alle Audio-Elemente und Buttons
    const backgroundMusic = document.getElementById('background-music'); // Hintergrundmusik
    const clickSound = document.getElementById('click-sound'); // Klick-Sound
    const musicToggle = document.getElementById('music-toggle'); // Musik-Kontroll-Button
    const buttons = document.querySelectorAll('nav a'); // Alle Navigation-Buttons
    
    // Musik-Lautstärke einstellen (50% = 0.5)
    backgroundMusic.volume = 0.3; // Hintergrundmusik leiser machen
    clickSound.volume = 0.5; // Klick-Sound mittlere Lautstärke
    
    // Variable um zu verfolgen ob Musik spielt
    let isPlaying = false;
    
    // Musik-Kontroll-Button Event (Ein/Ausschalten)
    musicToggle.addEventListener('click', function() {
        if (isPlaying) {
            // Musik ist an - schalte sie aus
            backgroundMusic.pause(); // Musik pausieren
            backgroundMusic.currentTime = 0; // Zurück zum Anfang
            musicToggle.textContent = '🔇 Musik'; // Button-Text ändern
            musicToggle.classList.add('paused'); // CSS-Klasse für grauen Look
            isPlaying = false; // Status aktualisieren
        } else {
            // Musik ist aus - schalte sie an
            backgroundMusic.play().then(() => {
                // Musik erfolgreich gestartet
                musicToggle.textContent = '🎵 Musik'; // Button-Text ändern
                musicToggle.classList.remove('paused'); // Grauen Look entfernen
                isPlaying = true; // Status aktualisieren
            }).catch(error => {
                // Fehler beim Abspielen (Browser blockiert Auto-Play)
                console.log('Musik konnte nicht automatisch gestartet werden:', error);
            });
        }
    });
    
    // Gehe durch jeden Navigation-Button und füge Effekte hinzu
    buttons.forEach(button => {
        
        // Wenn die Maus über einen Button bewegt wird
        button.addEventListener('mouseenter', function() {
            createSparkles(this); // Erstelle Funken für diesen Button
        });
        
        // Wenn auf einen Button geklickt wird
        button.addEventListener('click', function(e) {
            e.preventDefault(); // Verhindere sofortiges Weiterleiten
            
            // Spiele Klick-Sound ab
            clickSound.currentTime = 0; // Zurück zum Anfang (falls schon gespielt)
            clickSound.play().catch(error => {
                console.log('Klick-Sound konnte nicht gespielt werden:', error);
            });
            
            // Warte kurz und leite dann weiter (damit Sound gespielt wird)
            setTimeout(() => {
                window.location.href = this.href; // Gehe zur Zielseite
            }, 150); // 150 Millisekunden warten
        });
    });
    
    // Funktion um Funken zu erstellen
    function createSparkles(button) {
        
        // Erstelle 4 Funken rund um den Button
        for (let i = 0; i < 4; i++) {
            
            // Warte etwas zwischen jedem Funken (i * 150 = 0, 150, 300, 450 Millisekunden)
            setTimeout(() => {
                
                // Erstelle ein neues HTML-Element für den Funken
                const sparkle = document.createElement('div');
                sparkle.className = 'sparkle'; // Gib ihm die CSS-Klasse "sparkle"
                
                // Finde heraus wo der Button auf der Seite ist
                const rect = button.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2; // Mitte des Buttons horizontal
                const centerY = rect.top + rect.height / 2; // Mitte des Buttons vertikal
                
                // Setze den Funken an eine zufällige Position um den Button herum
                const randomX = centerX + (Math.random() - 0.5) * rect.width; // Zufällige X-Position
                const randomY = centerY + (Math.random() - 0.5) * rect.height; // Zufällige Y-Position
                
                // Setze die Position des Funkens
                sparkle.style.left = randomX + 'px'; // Horizontale Position
                sparkle.style.top = randomY + 'px'; // Vertikale Position
                
                // Füge den Funken zur Webseite hinzu
                document.body.appendChild(sparkle);
                
                // Entferne den Funken nach 800 Millisekunden (0,8 Sekunden)
                setTimeout(() => sparkle.remove(), 800);
                
            }, i * 150); // Verzögerung für jeden Funken
        }
    }
});