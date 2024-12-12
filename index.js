const canvas = document.getElementById("myCanvas");
const unit = 20;
const ctx = canvas.getContext("2d");
const snake = [{ x: unit, y: unit }];

let currentDirection = null;

ctx.fillStyle = "#FCDFDB";
ctx.fillRect(0, 0, canvas.width, canvas.height);

function spawnFood(canvas) {
  let point = { x: 0, y: 0 };
  point.x = Math.floor(Math.random() * (canvas.width / unit)) * unit;
  point.y = Math.floor(Math.random() * (canvas.height / unit)) * unit;
  return point;
}

function drawSnake(canvas, snake) {
  const context = canvas.getContext("2d");
  context.fillStyle = "green";

  for (let i = 1; i < snake.length; i++) {
    context.fillRect(snake[i].x, snake[i].y, unit, unit);
  }

  context.fillStyle = "#d2d80c";
  context.fillRect(snake[0].x, snake[0].y, unit, unit);
  context.fillStyle = "#1fadd6";
  context.fillRect(snake[0].x + 8, snake[0].y + 4, 4, 2);
  context.fillRect(snake[0].x + 8, snake[0].y + 12, 4, 2);
}

function moveSnake() {
  for (let i = snake.length - 1; i > 0; i--) {
    snake[i].x = snake[i - 1].x;
    snake[i].y = snake[i - 1].y;
  }

  switch (currentDirection) {
    case "down":
      snake[0].y += unit;
      break;
    case "up":
      snake[0].y -= unit;
      break;
    case "left":
      snake[0].x -= unit;
      break;
    case "right":
      snake[0].x += unit;
      break;
  }
}

function clearCanvas(canvas) {
  ctx.fillStyle = "#FCDFDB";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

document.addEventListener("keydown", (event) => {
  const keyPressed = event.key;
  switch (keyPressed) {
    case "j":
      if (currentDirection !== "up") currentDirection = "down";
      break;
    case "k":
      if (currentDirection !== "down") currentDirection = "up";
      break;
    case "h":
      if (currentDirection !== "right") currentDirection = "left";
      break;
    case "l":
      if (currentDirection !== "left") currentDirection = "right";
      break;
    case "Enter":
      location.reload();
      break;
  }
});

let food = spawnFood(canvas);
let interval = 150;
let over = false;
let score = 0;
const scoreEl = document.getElementById("score");
scoreEl.textContent = score;

function gameLoop() {
  if (over) {
    clearInterval(interval);
    ctx.fillStyle = "black";
    ctx.font = "30px Arial";
    ctx.textAlign = "center";
    ctx.fillText(
      "Game Over press enter to restart",
      canvas.width / 2,
      canvas.height / 2
    );

    return;
  }
  clearCanvas(canvas);
  drawSnake(canvas, snake);
  moveSnake();
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, unit, unit);
  if (snake.length > 1) {
    for (let i = 1; i < snake.length; i++) {
      if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
        over = true;
      }
    }
  }

  if (food.x == snake[0].x && food.y == snake[0].y) {
    snake.push({
      x: snake[snake.length - 1].x,
      y: snake[snake.length - 1],
    });
    score += 1;
    scoreEl.textContent = score;
    food = spawnFood(canvas);
  }
  if (
    snake[0].x >= canvas.width ||
    snake[0].x < 0 ||
    snake[0].y < 0 ||
    snake[0].y >= canvas.height
  ) {
    over = true;
  }

  console.log("update");
}

setInterval(gameLoop, interval);
