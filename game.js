// Get the game elements
const dino = document.getElementById('dino');
const cactus = document.getElementById('cactus');
const scoreElement = document.getElementById('score');
const gameOverElement = document.getElementById('gameOver');

// Game variables
let score = 0;
let isJumping = false;
let gameRunning = true;

// Listen for spacebar press
document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
        jump();
    }
});

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
}

// Restart game function
function restartGame() {
    gameRunning = true;
    score = 0;
    scoreElement.textContent = 'Score: 0';
    gameOverElement.style.display = 'none';
    cactus.style.animationPlayState = 'running';
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