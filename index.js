// Warte bis die komplette Webseite geladen ist
document.addEventListener('DOMContentLoaded', function() {
    
    // Finde alle Buttons auf der Seite (alle <a> Tags in der Navigation)
    const buttons = document.querySelectorAll('nav a');
    
    // Gehe durch jeden Button und füge Effekte hinzu
    buttons.forEach(button => {
        
        // Wenn die Maus über einen Button bewegt wird
        button.addEventListener('mouseenter', function() {
            createSparkles(this); // Erstelle Funken für diesen Button
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