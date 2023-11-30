const player = document.getElementById('player');
const gameContainer = document.getElementById('game-container');
const finishLine = document.getElementById('finish-line');
let playerX = 0;
let playerY = 0;
let playerWidth = player.offsetWidth;
let playerHeight = player.offsetHeight;
let isJumping = false;
let jumpVelocity = 0;
const jumpStrength = 10;
const gravity = 0.5;

const platforms = [
	{x: 0, y: 180, width: 1500, height: 20},
	{x: 1000, y: 80, width: 150, height: 20},
	{x: 600, y: 280, width: 50, height: 20},
	{x: 600, y: 380, width: 800, height: 20},
	{x: 1300, y: 0, width: 100, height: 400}
];

const obstacles = [
	{x: 300, y: 0, width: 50, height: 10},
	{x: 600, y: 130, width: 50, height: 50},
	{x: 750, y: 0, width: 50, height: 30},
	{x: 900, y: 200, width: 50, height: 30},
	{x: 1200, y: 200, width: 50, height: 50}
];

function createPlatform(x, y, width, height) {
    const platform = document.createElement('div');
    platform.className = 'platform';
    platform.style.width = width + 'px';
    platform.style.height = height + 'px';
    platform.style.left = x + 'px';
    platform.style.bottom = y + 'px';
    gameContainer.appendChild(platform);
}

function createObstacle(x, y, width, height) {
    const obstacle = document.createElement('div');
    obstacle.className = 'obstacle';
    obstacle.style.width = width + 'px';
    obstacle.style.height = height + 'px';
    obstacle.style.left = x + 'px';
    obstacle.style.bottom = y + 'px';
    gameContainer.appendChild(obstacle);
}

platforms.forEach(platform => createPlatform(platform.x, platform.y, platform.width, platform.height));
obstacles.forEach(obstacle => createObstacle(obstacle.x, obstacle.y, obstacle.width, obstacle.height));

function createFinishLine(x, y) {
    finishLine.style.left = x + 'px';
}

createFinishLine(1350);

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
        playerX += 10;
    } else if (event.key === 'ArrowLeft') {
        playerX -= 10;
    } else if (event.key === 'ArrowUp' && !isJumping) {
        jump();
    }
    updatePlayerPosition();
});

function updatePlayerPosition() {
    player.style.left = playerX + 'px';
    player.style.bottom = playerY + 'px';
}

function jump() {
    isJumping = true;
    jumpVelocity = jumpStrength;
}

function applyPhysics() {
    if (isJumping) {
        playerY += jumpVelocity;
        jumpVelocity -= gravity;

        if (playerY <= 0) {
            playerY = 0;
            isJumping = false;
            jumpVelocity = 0;
        }
    } else if (playerY > 0) {
        playerY = Math.max(0, playerY - gravity);
    }

    platforms.forEach(platform => {
      if (
          playerX + playerWidth > platform.x &&
          playerX < platform.x + platform.width &&
          playerY + playerHeight >= platform.y &&
          playerY <= platform.y + platform.height &&
          jumpVelocity <= 0
      ) {
          playerY = platform.y + platform.height;
          isJumping = false;
          jumpVelocity = 0;
      }
  });

  obstacles.forEach(obstacle => {
      if (
          playerX + playerWidth > obstacle.x &&
          playerX < obstacle.x + obstacle.width &&
          playerY + playerHeight >= obstacle.y &&
          playerY <= obstacle.y + obstacle.height
      ) {
          showGameOver();
      }
  });

  updatePlayerPosition();
}

function showCongratulation() {
  const message = document.createElement('div');
  message.className = 'message';
  message.textContent = 'Congratulations! You finished the game!';
  gameContainer.appendChild(message);
  setTimeout(() => {
      message.remove();
      location.reload();
  }, 3000);
}

function showGameOver() {
  const message = document.createElement('div');
  message.className = 'message';
  message.textContent = 'Game Over!';
  gameContainer.appendChild(message);
  setTimeout(() => {
      message.remove();
      location.reload(); 
  }, 3000); 
}

function checkFinish() {
  if (
      playerX + playerWidth > finishLine.offsetLeft &&
      playerX < finishLine.offsetLeft + finishLine.offsetWidth &&
      playerY + playerHeight >= finishLine.offsetTop
  ) {
      showCongratulation();
  }
}

setInterval(applyPhysics, 30);
setInterval(checkFinish, 100);