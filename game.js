let gameState = {
    isPlaying: false,
    isGameOver: false,
    score: 0,
    highScore: 0,
    speed: 4,
    obstacles: [],
    clouds: [],
    frameCount: 0
};

const dino = document.getElementById('dino');
const gameContainer = document.getElementById('gameContainer');
const scoreElement = document.getElementById('score');
const gameOverElement = document.getElementById('gameOver');
const startMessage = document.getElementById('startMessage');
const finalScoreElement = document.getElementById('finalScore');

let isJumping = false;
let isDucking = false;
let animationId;

// Event listeners
document.addEventListener('keydown', handleKeyPress);
document.addEventListener('keyup', handleKeyUp);

function handleKeyPress(e) {
    if (e.code === 'Space') {
        e.preventDefault();
        if (!gameState.isPlaying && !gameState.isGameOver) {
            startGame();
        } else if (gameState.isPlaying && !isJumping) {
            jump();
        }
    } else if (e.code === 'ArrowDown' && gameState.isPlaying) {
        duck();
    }
}

function handleKeyUp(e) {
    if (e.code === 'ArrowDown') {
        stopDucking();
    }
}

function startGame() {
    gameState.isPlaying = true;
    gameState.isGameOver = false;
    gameState.score = 0;
    gameState.speed = 4;
    gameState.obstacles = [];
    gameState.clouds = [];
    gameState.frameCount = 0;
    
    startMessage.style.display = 'none';
    gameOverElement.style.display = 'none';
    
    gameLoop();
}

function jump() {
    if (isJumping || isDucking) return;
    
    isJumping = true;
    dino.classList.add('jumping');
    
    setTimeout(() => {
        isJumping = false;
        dino.classList.remove('jumping');
    }, 800);
}

function duck() {
    if (isJumping) return;
    isDucking = true;
    dino.classList.add('ducking');
}

function stopDucking() {
    isDucking = false;
    dino.classList.remove('ducking');
}

function createObstacle() {
    const obstacle = document.createElement('div');
    obstacle.classList.add('cactus');
    
    // Randomly make some cacti taller
    if (Math.random() > 0.7) {
        obstacle.classList.add('tall');
    }
    
    gameContainer.appendChild(obstacle);
    return {
        element: obstacle,
        x: 800
    };
}

function createCloud() {
    const cloud = document.createElement('div');
    cloud.classList.add('cloud');
    cloud.style.top = Math.random() * 50 + 20 + 'px';
    gameContainer.appendChild(cloud);
    return {
        element: cloud,
        x: 800
    };
}

function updateObstacles() {
    // Create new obstacles
    if (gameState.frameCount % Math.max(80 - Math.floor(gameState.score / 100), 40) === 0) {
        gameState.obstacles.push(createObstacle());
    }

    // Update obstacle positions
    gameState.obstacles.forEach((obstacle, index) => {
        obstacle.x -= gameState.speed;
        obstacle.element.style.right = (800 - obstacle.x) + 'px';
        
        if (obstacle.x < -20) {
            obstacle.element.remove();
            gameState.obstacles.splice(index, 1);
        }
    });
}

function updateClouds() {
    // Create new clouds
    if (gameState.frameCount % 200 === 0) {
        gameState.clouds.push(createCloud());
    }

    // Update cloud positions
    gameState.clouds.forEach((cloud, index) => {
        cloud.x -= gameState.speed * 0.3;
        cloud.element.style.right = (800 - cloud.x) + 'px';
        
        if (cloud.x < -30) {
            cloud.element.remove();
            gameState.clouds.splice(index, 1);
        }
    });
}

function checkCollisions() {
    const dinoRect = dino.getBoundingClientRect();
    
    for (let obstacle of gameState.obstacles) {
        const obstacleRect = obstacle.element.getBoundingClientRect();
        
        if (dinoRect.right > obstacleRect.left + 5 &&
            dinoRect.left < obstacleRect.right - 5 &&
            dinoRect.bottom > obstacleRect.top + 5) {
            gameOver();
            return;
        }
    }
}

function updateScore() {
    gameState.score += 1;
    if (gameState.score > gameState.highScore) {
        gameState.highScore = gameState.score;
    }
    scoreElement.textContent = `HI ${gameState.highScore.toString().padStart(5, '0')} ${gameState.score.toString().padStart(5, '0')}`;
    
    // Increase speed gradually
    if (gameState.score % 100 === 0) {
        gameState.speed += 0.2;
    }
}

function gameLoop() {
    if (!gameState.isPlaying || gameState.isGameOver) return;
    
    gameState.frameCount++;
    
    updateObstacles();
    updateClouds();
    checkCollisions();
    
    if (gameState.frameCount % 5 === 0) {
        updateScore();
    }
    
    animationId = requestAnimationFrame(gameLoop);
}

function gameOver() {
    gameState.isGameOver = true;
    gameState.isPlaying = false;
    
    finalScoreElement.textContent = gameState.score;
    gameOverElement.style.display = 'block';
    
    cancelAnimationFrame(animationId);
}

function restartGame() {
    // Clear all obstacles and clouds
    gameState.obstacles.forEach(obstacle => obstacle.element.remove());
    gameState.clouds.forEach(cloud => cloud.element.remove());
    
    // Reset dino state
    dino.classList.remove('jumping', 'ducking');
    isJumping = false;
    isDucking = false;
    
    startGame();
}

// Initialize score display
scoreElement.textContent = `HI ${gameState.highScore.toString().padStart(5, '0')} ${gameState.score.toString().padStart(5, '0')}`;