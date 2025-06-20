// Get the game elements
const dino = document.getElementById('dino');
const cactus = document.getElementById('cactus');
const scoreElement = document.getElementById('score');
const gameOverElement = document.getElementById('gameOver');
const backgroundMusic = document.getElementById('backgroundMusic');
const gameOverSound = document.getElementById('gameOverSound');
const gameDiv = document.querySelector('.game');
const body = document.body;

// Game variables
let score = 0;
let isJumping = false;
let gameRunning = true;
let musicStarted = false;
let currentLevel = 1;

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
    currentLevel = 1;
    scoreElement.textContent = 'Score: 0';
    gameOverElement.style.display = 'none';
    
    // Reset colors to level 1
    body.classList.remove('level2', 'level3');
    gameDiv.classList.remove('level2', 'level3');
    
    // Reset cactus position by restarting the animation
    cactus.style.animation = 'none';
    setTimeout(() => {
        cactus.style.animation = 'moveCactus 2s linear infinite';
    }, 10);
    
    // Restart background music at normal speed
    backgroundMusic.currentTime = 0; // Reset to beginning
    backgroundMusic.playbackRate = 1.0; // Reset to normal speed
    backgroundMusic.play().catch(e => {
        console.log('Could not restart background music:', e);
    });
}

// Update score and check for level changes
function updateScore() {
    if (gameRunning) {
        score++;
        scoreElement.textContent = 'Score: ' + score;
        
        // Check for level changes
        checkLevelUp();
    }
}

// Check if player reached new level
function checkLevelUp() {
    if (score === 500 && currentLevel === 1) {
        levelUp(2);
    } else if (score === 1000 && currentLevel === 2) {
        levelUp(3);
    }
}

// Level up function
function levelUp(newLevel) {
    currentLevel = newLevel;
    
    // Change colors based on level
    if (newLevel === 2) {
        body.classList.add('level2');
        gameDiv.classList.add('level2');
        // Speed up music to 1.2x
        backgroundMusic.playbackRate = 1.2;
    } else if (newLevel === 3) {
        body.classList.remove('level2');
        gameDiv.classList.remove('level2');
        body.classList.add('level3');
        gameDiv.classList.add('level3');
        // Speed up music to 1.5x
        backgroundMusic.playbackRate = 1.5;
    }
}

// Game loop - runs every 100ms
setInterval(() => {
    if (gameRunning) {
        checkCollision();
        updateScore();
    }
}, 100);