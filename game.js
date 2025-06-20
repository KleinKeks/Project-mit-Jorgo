// Get the game elements
const dino = document.getElementById('dino');
const cactus = document.getElementById('cactus');
const scoreElement = document.getElementById('score');
const gameOverElement = document.getElementById('gameOver');
const backgroundMusic = document.getElementById('backgroundMusic');
const gameOverSound = document.getElementById('gameOverSound');

// Game variables
let score = 0;
let isJumping = false;
let gameRunning = true;
let musicStarted = false;

// Listen for spacebar press
document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
        // Start background music on first interaction
        if (!musicStarted) {
            startBackgroundMusic();
            musicStarted = true;
        }
        jump();
    }
});

// Start background music
function startBackgroundMusic() {
    backgroundMusic.volume = 0.3; // Set volume to 30%
    backgroundMusic.play().catch(e => {
        console.log('Could not play background music:', e);
    });
}

// Jump function
function jump() {
    if (isJumping) return; // Don't jump if already jumping
    
    isJumping = true;
    dino.classList.add('jump');
    
    // Remove jump class after animation
    setTimeout(() => {
        dino.classList.remove('jump');
        isJumping = false;
    }, 800);
}

// Check for collisions
function checkCollision() {
    const dinoRect = dino.getBoundingClientRect();
    const cactusRect = cactus.getBoundingClientRect();
    
    if (dinoRect.right > cactusRect.left && 
        dinoRect.left < cactusRect.right && 
        dinoRect.bottom > cactusRect.top) {
        gameOver();
    }
}

// Game over function
function gameOver() {
    gameRunning = false;
    gameOverElement.style.display = 'block';
    cactus.style.animationPlayState = 'paused';
    
    // Stop background music and play game over sound
    backgroundMusic.pause();
    gameOverSound.volume = 0.5; // Set volume to 50%
    gameOverSound.play().catch(e => {
        console.log('Could not play game over sound:', e);
    });
}

// Restart game function
function restartGame() {
    gameRunning = true;
    score = 0;
    scoreElement.textContent = 'Score: 0';
    gameOverElement.style.display = 'none';
    
    // Reset cactus position by restarting the animation
    cactus.style.animation = 'none';
    setTimeout(() => {
        cactus.style.animation = 'moveCactus 2s linear infinite';
    }, 10);
    
    // Restart background music
    backgroundMusic.currentTime = 0; // Reset to beginning
    backgroundMusic.play().catch(e => {
        console.log('Could not restart background music:', e);
    });
}

// Update score
function updateScore() {
    if (gameRunning) {
        score++;
        scoreElement.textContent = 'Score: ' + score;
    }
}

// Game loop - runs every 100ms
setInterval(() => {
    if (gameRunning) {
        checkCollision();
        updateScore();
    }
}, 100);