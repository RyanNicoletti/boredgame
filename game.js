const gameState = { highlighted: 0 };
let movingRight = false;
let movingLeft = false;

let gameText = document.querySelector(".game-text").textContent;
const gameTextElement = document.querySelector(".game-text");

function createCharacterSpans() {
  gameTextElement.innerHTML = gameText
    .split("")
    .map((char, index) => `<span id="char-${index}">${char}</span>`)
    .join("");
}

function moveHighlight(newIndex) {
  document.querySelector(".highlighted")?.classList.remove("highlighted");
  document.getElementById(`char-${newIndex}`).classList.add("highlighted");
  gameState.highlighted = newIndex;
}

function moveRight() {
  movingRight = true;

  function animate() {
    if (gameState.highlighted < gameText.length - 1 && movingRight) {
      moveHighlight(gameState.highlighted + 1);
      setTimeout(animate, 50);
    }
  }
  animate();
}

function moveLeft() {
  movingLeft = true;

  function animate() {
    if (gameState.highlighted > 0 && movingLeft) {
      moveHighlight(gameState.highlighted - 1);
      setTimeout(animate, 50);
    }
  }
  animate();
}

function generateGameString(length = 30) {
  const letters = "abcdefghijklmnopqrstuvwxyz";
  let randomString = "";
  while (length > 0) {
    randomString += letters[Math.floor(Math.random() * 26)];
    length--;
  }
  return randomString;
}

function resetPosition(index) {
  moveHighlight(index);
  gameState.highlighted = index;
}

function setTarget(index) {
  document.querySelector(".target")?.classList.remove("target");
  document.getElementById(`char-${index}`).classList.add("target");
}

function initGame() {
  gameText = generateGameString();
  createCharacterSpans();
  resetPosition(0);
  setTarget(gameText.length - (Math.floor(Math.random() * 4) + 7));
}

document.addEventListener("keydown", function (event) {
  if (event.key === "l" && !movingRight) {
    moveRight();
  }
  if (event.key === "h" && !movingLeft) {
    moveLeft();
  }
});

document.addEventListener("keyup", function (event) {
  if (event.key === "l") {
    movingRight = false;
    resetPosition(gameText.length - 1);
    setTarget(Math.floor(Math.random() * 4) + 5);
  }
  if (event.key === "h") {
    movingLeft = false;
    resetPosition(0);
    setTarget(gameText.length - (Math.floor(Math.random() * 4) + 7));
  }
});

window.addEventListener("load", function () {
  initGame();
});
