const gameState = { highlighted: 0 };
let movingRight = false;
let movingLeft = false;
const gameString = document.querySelector(".game-text").innerHTML;
const gameText = document.querySelector(".game-text").innerText;
const startIndex = 0;
const endIndex = gameString.length - 1;

function startLeft(idx) {
  document.querySelector(
    ".game-text"
  ).innerHTML = `<div class="game-text"><span class="highlighted">${
    gameString[idx]
  }</span>${gameString.slice(idx + 1)}</div>`;
}

function startRight(idx) {
  document.querySelector(
    ".game-text"
  ).innerHTML = `<div class="game-text">${gameString.slice(
    0,
    idx
  )}<span class="highlighted">${gameString[idx]}</span></div>`;
}

function moveRight(idx) {
  movingRight = true;

  function highlightRight(idx) {
    if (idx < gameString.length - 1 && movingRight) {
      moveRightOne(idx);
      idx++;
      gameState.highlighted++;
    } else {
      return;
    }
    setTimeout(() => {
      highlightRight(idx);
    }, 50);
  }
  highlightRight(idx);
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

function moveLeft(idx) {
  movingLeft = true;

  function highlightLeft(idx) {
    if (idx > 0 && movingLeft) {
      moveLeftOne(idx);
      idx--;
      gameState.highlighted--;
    } else {
      return;
    }
    setTimeout(() => {
      highlightLeft(idx);
    }, 50);
  }
  highlightLeft(idx);
}

function moveLeftOne(i) {
  document.querySelector(
    ".game-text"
  ).innerHTML = `<div class="game-text">${gameString.slice(
    0,
    i - 1
  )}<span class="highlighted">${gameString[i - 1]}</span>${gameString.slice(
    i,
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
    gameState.highlighted = gameText.length - 1;
    startRight(endIndex);
  }
});

document.addEventListener("keydown", function (event) {
  if (event.key === "h") {
    if (!movingLeft) {
      moveLeft(gameState.highlighted);
    }
  }
});

document.addEventListener("keyup", function (event) {
  if (event.key === "h") {
    movingLeft = false;
    gameState.highlighted = 0;
    startLeft(startIndex);
  }
});

startLeft(startIndex);
