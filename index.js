document.addEventListener('DOMContentLoaded', function() {
    const hintergrundMusik = document.getElementById('background-music');
    const musikButton = document.getElementById('music-toggle');
    const navigationButtons = document.querySelectorAll('nav a');
    
    hintergrundMusik.volume = 0.3;
    let musikLaeuft = false;
    
    musikAutomatischStarten();
    musikButton.addEventListener('click', musikEinAusSchalten);
    
    navigationButtons.forEach(button => {
        button.addEventListener('mouseenter', funkenEffektErstellen);
        button.addEventListener('click', buttonGeklickt);
    });

    function musikAutomatischStarten() {
        hintergrundMusik.play()
            .then(() => {
                musikButtonAktualisieren(true);
                musikLaeuft = true;
            })
            .catch(fehler => {
                musikButtonAktualisieren(false);
                musikLaeuft = false;
            });
    }
    
    function musikEinAusSchalten() {
        if (musikLaeuft) {
            musikAusschalten();
        } else {
            musikEinschalten();
        }
    }
    
    function musikAusschalten() {
        hintergrundMusik.pause();
        hintergrundMusik.currentTime = 0;
        musikButtonAktualisieren(false);
        musikLaeuft = false;
    }
    
    function musikEinschalten() {
        hintergrundMusik.play()
            .then(() => {
                musikButtonAktualisieren(true);
                musikLaeuft = true;
            })
    }
    
    function musikButtonAktualisieren(istAn) {
        if (istAn) {
            musikButton.textContent = '🎵 Musik';
            musikButton.classList.remove('paused');
        } else {
            musikButton.textContent = '🔇 Musik';
            musikButton.classList.add('paused');
        }
    }
    
    function funkenEffektErstellen() {
        const button = this;
        for (let i = 0; i < 4; i++) {
            setTimeout(() => {
                einenFunkenErstellen(button);
            }, i * 150);
        }
    }
    
    function einenFunkenErstellen(button) {
        const funke = document.createElement('div');
        funke.className = 'sparkle';
        
        const buttonPosition = button.getBoundingClientRect();
        const buttonMitteX = buttonPosition.left + buttonPosition.width / 2;
        const buttonMitteY = buttonPosition.top + buttonPosition.height / 2;
        
        const zufaelligeX = buttonMitteX + (Math.random() - 0.5) * buttonPosition.width;
        const zufaelligeY = buttonMitteY + (Math.random() - 0.5) * buttonPosition.height;
        
        funke.style.left = zufaelligeX + 'px';
        funke.style.top = zufaelligeY + 'px';
        
        document.body.appendChild(funke);
        
        setTimeout(() => {
            funke.remove();
        }, 800);
    }
    
    function buttonGeklickt(event) {
        event.preventDefault();
        const button = this;
        setTimeout(() => {
            window.location.href = button.href;
        }, 150);
    }
});
