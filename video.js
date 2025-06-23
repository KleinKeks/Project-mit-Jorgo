// Simple music toggle
let isPlaying = false;
const musicButton = document.getElementById('music-toggle');

musicButton.addEventListener('click', function() {
  if (isPlaying) {
    // Musik pausieren
    musicButton.textContent = '🎵 Musik';
    musicButton.classList.add('paused');
    isPlaying = false;
  } else {
    // Musik abspielen
    musicButton.textContent = '🔇 Musik';
    musicButton.classList.remove('paused');
    isPlaying = true;
  }
});

// Stoppe andere Videos wenn eines abgespielt wird
const videos = document.querySelectorAll('video');

videos.forEach(video => {
  video.addEventListener('play', function() {
    // Pausiere alle anderen Videos
    videos.forEach(otherVideo => {
      if (otherVideo !== video) {
        otherVideo.pause();
      }
    });
    
    // Pausiere die Musik wenn ein Video startet
    if (isPlaying) {
      musicButton.textContent = '🎵 Musik';
      musicButton.classList.add('paused');
      isPlaying = false;
    }
  });
});

// Einfache Hover-Effekte für Video-Container
const videoContainers = document.querySelectorAll('.video-container');

videoContainers.forEach(container => {
  container.addEventListener('mouseenter', function() {
    // Kleiner Hover-Effekt
    this.style.background = 'rgba(255, 255, 255, 0.15)';
  });
  
  container.addEventListener('mouseleave', function() {
    // Zurück zum normalen Zustand
    this.style.background = 'rgba(255, 255, 255, 0.1)';
  });
});