const gameState = { highlighted: 0 };
let movingRight = false;
let movingLeft = false;

const gameText = document.querySelector(".game-text").textContent;
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

function resetPosition(index) {
  moveHighlight(index);
  gameState.highlighted = index;
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
    // resetPosition(target);
    // updateTarget
  }
  if (event.key === "h") {
    movingLeft = false;
    // resetPosition(target);
    // updateTarget
  }
});

window.addEventListener("load", function () {
  createCharacterSpans();
  resetPosition(0);
});
