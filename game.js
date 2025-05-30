const gameState = { highlighted: 0 };
let movingRight = false;
const movingLeft = false;
const gameString = document.querySelector(".game-text").innerHTML;
const gameText = document.querySelector(".game-text").innerText;
const endIndex = gameString.length - 1;

function startLeft(idx) {
  document.querySelector(
    ".game-text"
  ).innerHTML = `<div class="game-text"><span class="highlighted">${
    gameString[idx]
  }</span>${gameString.slice(idx + 1)}</div>`;
}

function startRight() {}

function moveRight(idx) {
  movingRight = true;

  function move(idx) {
    if (idx < gameString.length - 1 && movingRight) {
      moveRightOne(idx);
      idx++;
      gameState.highlighted++;
      console.log(idx);
    } else {
      return;
    }
    setTimeout(() => {
      move(idx);
    }, 50);
  }
  move(idx);
}

function moveRightOne(i) {
  document.querySelector(
    ".game-text"
  ).innerHTML = `<div class="game-text">${gameString.slice(
    0,
    i + 1
  )}<span class="highlighted">${gameString[i + 1]}</span>${gameString.slice(
    i + 2,
    gameString.length + 1
  )}</div>`;
}

document.addEventListener("keydown", function (event) {
  if (event.key === "l") {
    if (!movingRight) {
      moveRight(gameState.highlighted);
    }
  }
});

document.addEventListener("keyup", function (event) {
  if (event.key === "l") {
    movingRight = false;
    console.log(gameState.highlighted);
    startRight(endIndex);
  }
});

startLeft(gameState.highlighted);
