const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const box = 20;
let snake = [];
snake[0] = { x: 9 * box, y: 10 * box };
let food = {
  x: Math.floor(Math.random() * 19 + 1) * box,
  y: Math.floor(Math.random() * 19 + 1) * box
};
let d;

// Control the snake
document.addEventListener('keydown', direction);

function direction(event) {
  if (event.keyCode === 37 && d !== 'RIGHT') d = 'LEFT';
  else if (event.keyCode === 38 && d !== 'DOWN') d = 'UP';
  else if (event.keyCode === 39 && d !== 'LEFT') d = 'RIGHT';
  else if (event.keyCode === 40 && d !== 'UP') d = 'DOWN';
}

// Draw everything
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? 'green' : 'lightgreen';
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }
  ctx.fillStyle = 'red';
  ctx.fillRect(food.x, food.y, box, box);

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (d === 'LEFT') snakeX -= box;
  if (d === 'UP') snakeY -= box;
  if (d === 'RIGHT') snakeX += box;
  if (d === 'DOWN') snakeY += box;

  if (snakeX === food.x && snakeY === food.y) {
    food = {
      x: Math.floor(Math.random() * 19 + 1) * box,
      y: Math.floor(Math.random() * 19 + 1) * box
    };
  } else {
    snake.pop();
  }

  const newHead = {
    x: snakeX,
    y: snakeY
  };

  if (collision(newHead, snake)) clearInterval(game);
  snake.unshift(newHead);

  if (snakeX < 0 || snakeX >= canvas.width || snakeY < 0 || snakeY >= canvas.height) clearInterval(game);
}

// Collision detection
function collision(head, array) {
  for (let i = 0; i < array.length; i++) {
    if (head.x === array[i].x && head.y === array[i].y) return true;
  }
  return false;
}

const game = setInterval(draw, 100);

// Handle Back Button
document.getElementById('back-button').addEventListener('click', () => {
  window.location.href = 'game.html'; // Adjust this path as needed
});