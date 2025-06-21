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
let currentSpeed = 2; // Track current animation duration

// Function to go back to home screen
function goHome() {
    // Stop all sounds
    backgroundMusic.pause();
    gameOverSound.pause();
    
    // Navigate back to index.html (adjust the path if needed)
    window.location.href = 'index.html';
}

// Listen for spacebar press and touch events
document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
        event.preventDefault(); // Prevent page scrolling
        // Start background music on first interaction
        if (!musicStarted) {
            startBackgroundMusic();
            musicStarted = true;
        }
        jump();
    }
});

// Touch support for mobile
document.addEventListener('touchstart', function(event) {
    event.preventDefault();
    // Start background music on first interaction
    if (!musicStarted) {
        startBackgroundMusic();
        musicStarted = true;
    }
    jump();
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
    if (isJumping || !gameRunning) return; // Don't jump if already jumping or game is over
    
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
    
    // More precise collision detection
    const collisionBuffer = 10; // Small buffer to make game more forgiving
    
    if (dinoRect.right > cactusRect.left + collisionBuffer && 
        dinoRect.left < cactusRect.right - collisionBuffer && 
        dinoRect.bottom > cactusRect.top + collisionBuffer) {
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
    currentSpeed = 2; // Reset speed to original
    scoreElement.textContent = 'Score: 0';
    gameOverElement.style.display = 'none';
    
    // Reset cactus position and animation
    cactus.style.animation = 'none';
    cactus.offsetHeight; // Force reflow
    cactus.style.animationDuration = currentSpeed + 's';
    cactus.style.animation = 'moveCactus ' + currentSpeed + 's linear infinite';
    cactus.style.animationPlayState = 'running';
    
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
        
        // Speed up cactus every 100 points
        if (score % 100 === 0) {
            speedUpGame();
        }
    }
}

// Speed up the game
function speedUpGame() {
    // Calculate new speed (gets faster every 100 points)
    const speedLevel = Math.floor(score / 100);
    currentSpeed = Math.max(0.8, 2 - (speedLevel * 0.2)); // Minimum 0.8 seconds
    
    // Apply new speed
    cactus.style.animationDuration = currentSpeed + 's';
}

// Add instructions when game starts
function addInstructions() {
    if (!document.querySelector('.instructions')) {
        const instructions = document.createElement('div');
        instructions.className = 'instructions';
        instructions.textContent = 'Drücke LEERTASTE oder berühre den Bildschirm zum Springen!';
        document.querySelector('.game').appendChild(instructions);
        
        // Remove instructions after first jump
        const removeInstructions = () => {
            if (instructions && instructions.parentNode) {
                instructions.parentNode.removeChild(instructions);
            }
            document.removeEventListener('keydown', removeInstructions);
            document.removeEventListener('touchstart', removeInstructions);
        };
        
        setTimeout(() => {
            document.addEventListener('keydown', removeInstructions);
            document.addEventListener('touchstart', removeInstructions);
        }, 100);
    }
}

// Game loop - runs every 100ms
setInterval(() => {
    if (gameRunning) {
        checkCollision();
        updateScore();
    }
}, 100);

// Initialize game
window.addEventListener('load', () => {
    addInstructions();
});

// Prevent space bar from scrolling the page
window.addEventListener('keydown', function(e) {
    if(e.keyCode === 32 && e.target === document.body) {
        e.preventDefault();
    }
});