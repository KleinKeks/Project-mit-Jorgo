// Warte bis die komplette Webseite geladen ist
document.addEventListener('DOMContentLoaded', function() {
    
    // Finde alle wichtigen Elemente auf der Webseite
    const hintergrundMusik = document.getElementById('background-music');
    const musikButton = document.getElementById('music-toggle');
    const navigationButtons = document.querySelectorAll('nav a');
    
    // Musik-Lautstärke auf 30% einstellen
    hintergrundMusik.volume = 0.3;
    
    // Variable um zu wissen ob Musik läuft
    let musikLaeuft = false;
    
    // Versuche Musik automatisch zu starten
    musikAutomatischStarten();
    
    // Event-Listener für Musik-Button
    musikButton.addEventListener('click', musikEinAusSchalten);
    
    // Event-Listener für alle Navigation-Buttons
    navigationButtons.forEach(button => {
        button.addEventListener('mouseenter', funkenEffektErstellen);
        button.addEventListener('click', buttonGeklickt);
    });
    
    // FUNKTIONEN (alle auf Deutsch benannt)
    
    // Funktion: Musik automatisch starten
    function musikAutomatischStarten() {
        hintergrundMusik.play()
            .then(() => {
                // Musik erfolgreich gestartet
                musikButtonAktualisieren(true);
                musikLaeuft = true;
                console.log('Musik wurde automatisch gestartet');
            })
            .catch(fehler => {
                // Browser hat Auto-Play blockiert
                musikButtonAktualisieren(false);
                musikLaeuft = false;
                console.log('Musik konnte nicht automatisch gestartet werden:', fehler);
            });
    }
    
    // Funktion: Musik ein- oder ausschalten
    function musikEinAusSchalten() {
        if (musikLaeuft) {
            musikAusschalten();
        } else {
            musikEinschalten();
        }
    }
    
    // Funktion: Musik ausschalten
    function musikAusschalten() {
        hintergrundMusik.pause();
        hintergrundMusik.currentTime = 0; // Zurück zum Anfang
        musikButtonAktualisieren(false);
        musikLaeuft = false;
        console.log('Musik wurde ausgeschaltet');
    }
    
    // Funktion: Musik einschalten
    function musikEinschalten() {
        hintergrundMusik.play()
            .then(() => {
                musikButtonAktualisieren(true);
                musikLaeuft = true;
                console.log('Musik wurde eingeschaltet');
            })
            .catch(fehler => {
                console.log('Fehler beim Einschalten der Musik:', fehler);
            });
    }
    
    // Funktion: Musik-Button Text und Aussehen aktualisieren
    function musikButtonAktualisieren(istAn) {
        if (istAn) {
            musikButton.textContent = '🎵 Musik';
            musikButton.classList.remove('paused');
        } else {
            musikButton.textContent = '🔇 Musik';
            musikButton.classList.add('paused');
        }
    }
    
    // Funktion: Funken-Effekt erstellen (wird bei Maus-über aufgerufen)
    function funkenEffektErstellen() {
        const button = this; // Der Button über dem die Maus ist
        
        // Erstelle 4 Funken mit Verzögerung
        for (let i = 0; i < 4; i++) {
            setTimeout(() => {
                einenFunkenErstellen(button);
            }, i * 150); // 0ms, 150ms, 300ms, 450ms Verzögerung
        }
    }
    
    // Funktion: Einen einzelnen Funken erstellen
    function einenFunkenErstellen(button) {
        // Neues HTML-Element für den Funken
        const funke = document.createElement('div');
        funke.className = 'sparkle';
        
        // Button-Position herausfinden
        const buttonPosition = button.getBoundingClientRect();
        const buttonMitteX = buttonPosition.left + buttonPosition.width / 2;
        const buttonMitteY = buttonPosition.top + buttonPosition.height / 2;
        
        // Zufällige Position um den Button herum
        const zufaelligeX = buttonMitteX + (Math.random() - 0.5) * buttonPosition.width;
        const zufaelligeY = buttonMitteY + (Math.random() - 0.5) * buttonPosition.height;
        
        // Funken positionieren
        funke.style.left = zufaelligeX + 'px';
        funke.style.top = zufaelligeY + 'px';
        
        // Funken zur Seite hinzufügen
        document.body.appendChild(funke);
        
        // Funken nach 800ms wieder entfernen
        setTimeout(() => {
            funke.remove();
        }, 800);
    }
    
    // Funktion: Was passiert wenn ein Button geklickt wird
    function buttonGeklickt(event) {
        event.preventDefault(); // Verhindere sofortiges Weiterleiten
        
        const button = this; // Der geklickte Button
        
        // Kurz warten, dann zur Zielseite gehen
        setTimeout(() => {
            window.location.href = button.href;
        }, 150);
    }
    
});