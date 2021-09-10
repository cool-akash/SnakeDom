// Game Variables
let vel = { x: 0, y: 0 };
let speed = 10;
let count = 0;
let visited = 0;
let array = [{ x: 7, y: 7 }];
let premove = ".";
let prex = 1;
let prey = 0;
egg = { x: 6, y: 7 };
let useless = 0;
const eggSound = new Audio("music/egg.mp3");
const gameOverSound = new Audio("music/gameover.mp3");
const moveSound = new Audio("music/move.mp3");
var gameSound = new Audio("music/game.mp3");

// Game Over code
function isdestroy(snake) {
  // Eat himself - whether head cuts the body or not
  for (let i = 1; i < array.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }
  // Wall Collision - whethercollides with wall or not
  if (snake[0].x > 44 || snake[0].x < 0 || snake[0].y > 18 || snake[0].y < 0) {
    return true;
  }
  return false;
}

// Game Functions
function main(ctime) {
  window.requestAnimationFrame(main);
  if ((ctime - visited) / 1000 < 1 / speed) {
    return;
  }
  visited = ctime;
  gameEngine();
}

function gameEngine() {
  // Update snake array & egg

  if (isdestroy(array)) {
    gameOverSound.play();
    gameSound.pause();
    vel = { x: 0, y: 0 };
    alert("Game Over. Press any key to play again");
    (prex = 1), (prey = 0);
    premove = ".";
    count = 0;
    score.innerHTML = "Score: " + count;
    array = [{ x: 7, y: 7 }];
    gameSound = new Audio("music/game.mp3");
    gameSound.play();
  }

  // If you have eaten the egg, increment the count and regenerate the egg
  if (array[0].y === egg.y && array[0].x === egg.x) {
    eggSound.play();
    count++;
    if (count > max) {
      max = count;
      localStorage.setItem("mscore", JSON.stringify(max));
      maxScore.innerHTML = "High Score: " + max;
    }
    score.innerHTML = "Score: " + count;
    array.unshift({
      x: array[0].x + vel.x,
      y: array[0].y + vel.y,
    });

    //   Random generated numbers for egg display between
    //   1 - 42 - xdirection
    //   1 - 16 - ydirection
    egg = {
      x: Math.round(1 + 41 * Math.random()),
      y: Math.round(1 + 16 * Math.random()),
    };
  }

  // Snake movement
  for (var i = array.length - 2; i >= 0; i--) {
    array[i + 1] = { ...array[i] };
  }

  array[0].x += vel.x;
  array[0].y += vel.y;

  // Snake printing
  board.innerHTML = "";
  array.forEach((e, index) => {
    snakeBody = document.createElement("div");
    snakeBody.style.gridColumnStart = e.x;
    snakeBody.style.gridRowStart = e.y;

    if (index === 0) {
      snakeBody.classList.add("head");
    } else {
      snakeBody.classList.add("snake");
    }

    board.appendChild(snakeBody);
  });

  // egg printing
  eggElement = document.createElement("div");
  eggElement.style.gridRowStart = egg.y;
  eggElement.style.gridColumnStart = egg.x;
  eggElement.classList.add("egg");
  board.appendChild(eggElement);
}

// Main logic starts here
gameSound.play();
let mscore = localStorage.getItem("mscore");
if (mscore === null) {
  max = 0;
  localStorage.setItem("mscore", JSON.stringify(max));
} else {
  max = JSON.parse(mscore);
  maxScore.innerHTML = "High Score: " + mscore;
}

// Arrow Keys Functions
window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  moveSound.play();
  switch (e.key) {
    case "ArrowUp":
      console.log("ArrowUp");
      if (premove == "ArrowDown" || premove == "ArrowUp") {
        // no movement in up down again
        vel.x = prex;
        vel.y = prey;
        break;
      }
      premove = "ArrowUp";
      vel.x = 0;
      vel.y = -1;
      prex = 0;
      prey = -1;
      break;

    case "ArrowDown":
      console.log("ArrowDown");
      if (premove == "ArrowUp" || premove == "ArrowDown") {
        vel.x = prex; // Storing previous data of x and y movement
        vel.y = prey;
        break;
      }
      premove = "ArrowDown"; // Storing previous move
      vel.x = 0;
      vel.y = 1;
      prex = 0;
      prey = 1;
      break;

    case "ArrowLeft":
      console.log("ArrowLeft");
      if (premove == "ArrowRight" || premove == "ArrowLeft") {
        // no movement in left and right again
        vel.x = prex; // Storing previous data of x and y movement
        vel.y = prey;
        break;
      }
      premove = "ArrowLeft"; // Storing previous move
      vel.x = -1;
      vel.y = 0;
      prex = -1;
      prey = 0;

      break;

    case "ArrowRight":
      console.log("ArrowRight");
      if (premove == "ArrowLeft" || premove == "ArrowRight") {
        vel.x = prex;
        vel.y = prey;
        break;
      }
      premove = "ArrowRight";
      vel.x = 1;
      vel.y = 0;
      prex = 1;
      prey = 0;
      break;

    default:
      vel.x = prex;
      vel.y = prey;
      break;
  }
});
