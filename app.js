let move = new Audio("./music/move.mp3");
let eatMusic = new Audio("./music/food.mp3");
let deadMusic = new Audio("./music/gameover.mp3");
let score = document.querySelector("#score");
let LastPaintTime = 0;
let speed = 5;
let gameScore = 0;
let direction = { x: 0, y: 0 };
let food = { x: 2, y: 3 };
let snake = [{ x: 5, y: 8 }];

function selfCollid(snakeBody) {
  let dup = 0;
  for (let p = 1; p < snakeBody.length; p++) {
    if (snakeBody[0].x === snakeBody[p].x && snakeBody[0].y === snakeBody[p].y)
      return true;
  }
  return false;
}
function isCollid(snakeBody) {
  if (
    snakeBody[0].x === 0 ||
    snakeBody[0].y === 0 ||
    snakeBody[0].x === 20 ||
    snakeBody[0].y === 20
  )
    return true;
  else if (selfCollid(snakeBody)) return true;
  else return false;
}
function main(ctime) {
  window.requestAnimationFrame(main);
  if ((ctime - LastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  LastPaintTime = ctime;
  //   console.log(ctime);
  gameEngine();
}

function gameEngine() {
  let board = document.querySelector(".board");
  // part 1 update snake array and food

  if (isCollid(snake)) {
    deadMusic.play();
    direction = { x: 0, y: 0 };
    snake = [{ x: 5, y: 8 }];
    let food = { x: 2, y: 3 };
    alert("press any key to try again");
    speed = 5;
    gameScore = 0;
    score.innerText = `Your Score = ${gameScore}`;
  }
  // if food eaten regenerate the food and increase body

  if (snake[0].x === food.x && snake[0].y === food.y) {
    eatMusic.play();
    snake.unshift({ x: snake[0].x + direction.x, y: snake[0].y + direction.y });
    food.x = Math.floor(Math.random() * 20) + 1;
    food.y = Math.floor(Math.random() * 20) + 1;
    gameScore += speed;
    score.innerText = `Your Score = ${gameScore}`;
    speed += 1;
  }

  //moving

  for (let i = snake.length - 2; i >= 0; i--) {
    snake[i + 1] = { ...snake[i] };
  }
  snake[0].x += direction.x;
  snake[0].y += direction.y;

  //part 2 display snake and food
  //snake move
  board.innerHTML = "";
  snake.forEach((e, index) => {
    let snakeElement = document.createElement("div");

    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;

    if (index === 0) {
      //if head then red
      snakeElement.classList.add("snakehead");
    } else {
      snakeElement.classList.add("snakeBody");
    }
    board.appendChild(snakeElement);
  });
  //food display

  let snakeFood = document.createElement("div");
  snakeFood.classList.add("food");
  snakeFood.style.gridRowStart = food.y;
  snakeFood.style.gridColumnStart = food.x;
  board.appendChild(snakeFood);
}

window.requestAnimationFrame(main);

//main logic

document.addEventListener("keydown", (e) => {
  direction = { x: 0, y: 1 };
  move.play();
  switch (e.key) {
    case "ArrowUp":
      direction.x = 0;
      direction.y = -1;
      break;

    case "ArrowDown":
      direction.x = 0;
      direction.y = 1;
      break;

    case "ArrowRight":
      direction.x = 1;
      direction.y = 0;
      break;

    case "ArrowLeft":
      direction.x = -1;
      direction.y = 0;
      break;
  }
});
