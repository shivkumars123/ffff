const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const grid = 20;
let count = 0;
let snake = [{ x: 160, y: 160 }];
let apple = { x: 200, y: 200 };
let dx = grid;
let dy = 0;
let changingDirection = false;
let gameOver = false;

function gameLoop() {
  if (gameOver) return;

  changingDirection = false;
  count++;

  if (count >= 4) {
    count = 0;
    moveSnake();
    if (checkCollision()) {
      gameOver = true;
      alert('Game Over');
      return;
    }
    if (eatApple()) {
      extendSnake();
      placeApple();
    }
    draw();
  }
}

function moveSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);
  snake.pop();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw snake
  ctx.fillStyle = 'green';
  snake.forEach(part => ctx.fillRect(part.x, part.y, grid, grid));

  // Draw apple
  ctx.fillStyle = 'red';
  ctx.fillRect(apple.x, apple.y, grid, grid);
}

function eatApple() {
  return snake[0].x === apple.x && snake[0].y === apple.y;
}

function extendSnake() {
  snake.push({...snake[snake.length - 1]});
}

function placeApple() {
  apple.x = Math.floor(Math.random() * (canvas.width / grid)) * grid;
  apple.y = Math.floor(Math.random() * (canvas.height / grid)) * grid;
}

function checkCollision() {
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }
  return snake[0].x < 0 || snake[0].x >= canvas.width || snake[0].y < 0 || snake[0].y >= canvas.height;
}

// Handle keyboard input
window.addEventListener('keydown', (e) => {
  if (changingDirection) return;
  changingDirection = true;
  switch (e.code) {
    case 'ArrowUp':
      if (dy === 0) { dx = 0; dy = -grid; }
      break;
    case 'ArrowDown':
      if (dy === 0) { dx = 0; dy = grid; }
      break;
    case 'ArrowLeft':
      if (dx === 0) { dx = -grid; dy = 0; }
      break;
    case 'ArrowRight':
      if (dx === 0) { dx = grid; dy = 0; }
      break;
  }
});

// Handle touch controls
document.getElementById('up').addEventListener('touchstart', () => {
  if (dy === 0) { dx = 0; dy = -grid; }
});
document.getElementById('down').addEventListener('touchstart', () => {
  if (dy === 0) { dx = 0; dy = grid; }
});
document.getElementById('left').addEventListener('touchstart', () => {
  if (dx === 0) { dx = -grid; dy = 0; }
});
document.getElementById('right').addEventListener('touchstart', () => {
  if (dx === 0) { dx = grid; dy = 0; }
});

// Back button functionality
document.getElementById('back-button').addEventListener('click', () => {
  window.location.href = 'game.html'; // Go back to the Tic-Tac-Toe game
});

// Next button functionality
document.getElementById('next-button').addEventListener('click', () => {
  window.location.href = 'nextgame.html'; // Replace with the URL of the next page/game
});

setInterval(gameLoop, 100);