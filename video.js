const musicButton = document.getElementById('music-toggle');
const backgroundMusic = document.getElementById('background-music');
let isPlaying = false;

// Musik automatisch versuchen zu starten (leise, wenn erlaubt)
window.addEventListener('DOMContentLoaded', () => {
  backgroundMusic.volume = 0.3;
  backgroundMusic.play().then(() => {
    musicButton.textContent = '🔇 Musik';
    isPlaying = true;
  }).catch(() => {
    musicButton.textContent = '🎵 Musik';
    isPlaying = false;
  });
});

// Musik-Button klickbar machen
musicButton.addEventListener('click', function () {
  if (isPlaying) {
    backgroundMusic.pause();
    musicButton.textContent = '🎵 Musik';
    isPlaying = false;
    backgroundMusic.currentTime = 0;
  } else {
    backgroundMusic.play().then(() => {
      musicButton.textContent = '🔇 Musik';
      isPlaying = true;
    }).catch(err => {
      console.error("Musik konnte nicht abgespielt werden:", err);
    });
  }
});

// Andere Videos pausieren, wenn eines spielt
const videos = document.querySelectorAll('video');

videos.forEach(video => {
  video.addEventListener('play', function () {
    videos.forEach(otherVideo => {
      if (otherVideo !== video) {
        otherVideo.pause();
      }
    });

    if (isPlaying) {
      backgroundMusic.pause();
      musicButton.textContent = '🎵 Musik';
      isPlaying = false;
    }
  });
});

// Hover-Effekt für Videoboxen
const videoContainers = document.querySelectorAll('.video-container');

videoContainers.forEach(container => {
  container.addEventListener('mouseenter', function () {
    this.style.background = 'rgba(255, 255, 255, 0.15)';
  });

  container.addEventListener('mouseleave', function () {
    this.style.background = 'rgba(255, 255, 255, 0.1)';
  });
});
