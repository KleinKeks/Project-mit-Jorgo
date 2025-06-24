const musicButton = document.getElementById('music-toggle');
const backgroundMusic = document.getElementById('background-music');
const videos = document.querySelectorAll('video');
const videoContainers = document.querySelectorAll('.video-container');
let isPlaying = false;

// Hilfsfunktion zur UI-Aktualisierung
function updateMusicButtonUI() {
  if (isPlaying) {
    musicButton.textContent = '🎵 Musik';
    musicButton.classList.remove('paused');
  } else {
    musicButton.textContent = '🔇 Musik';
    musicButton.classList.add('paused');
  }
}

// Musik automatisch versuchen zu starten (leise, wenn erlaubt)
window.addEventListener('DOMContentLoaded', () => {
  backgroundMusic.volume = 0.3;
  backgroundMusic.play().then(() => {
    isPlaying = true;
    updateMusicButtonUI();
  }).catch(() => {
    isPlaying = false;
    updateMusicButtonUI();
  });
});

// Musik-Button klickbar machen
musicButton.addEventListener('click', function () {
  if (isPlaying) {
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
    isPlaying = false;
    updateMusicButtonUI();
  } else {
    backgroundMusic.play().then(() => {
      isPlaying = true;
      updateMusicButtonUI();
    }).catch(err => {
      console.error("Musik konnte nicht abgespielt werden:", err);
    });
  }
});

// Andere Videos pausieren, wenn eines spielt
videos.forEach(video => {
  video.addEventListener('play', function () {
    videos.forEach(otherVideo => {
      if (otherVideo !== video) {
        otherVideo.pause();
      }
    });

    if (isPlaying) {
      backgroundMusic.pause();
      isPlaying = false;
      updateMusicButtonUI();
    }
  });
});

// Video-Hover-Effekt
videoContainers.forEach(container => {
  container.addEventListener('mouseenter', function () {
    this.style.background = 'rgba(255, 255, 255, 0.15)';
  });

  container.addEventListener('mouseleave', function () {
    this.style.background = 'rgba(255, 255, 255, 0.1)';
  });
});
