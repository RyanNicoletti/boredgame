const gameState = {
  highlighted: 0,
  score: 0,
  currentHearts: 3,
  maxHearts: 6,
  target: null,
  isAnimating: false,
};
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
  gameState.target = index;
}

function initGame() {
  gameText = generateGameString();
  updateHeartDisplay();
  createCharacterSpans();
  resetPosition(0);
  setTarget(gameText.length - (Math.floor(Math.random() * 4) + 7));
}

function updateHeartDisplay() {
  const heartsContainer = document.querySelector(".hearts");
  heartsContainer.innerHTML = "";

  const numHearts = gameState.currentHearts;
  const halfHeart = gameState.currentHearts % 1 === 0.5;

  for (let i = 0; i < numHearts; i++) {
    heartsContainer.appendChild(createHeartSVG("full"));
  }
  if (halfHeart) {
    heartsContainer.appendChild(createHeartSVG("half"));
  }
}

function updateScore() {
  if (gameState.highlighted === gameState.target) {
    gameState.currentHearts += 1;
    updateHeartDisplay();
    gameState.score += 50;
    document.getElementById("score").textContent = gameState.score;
  } else if (Math.abs(gameState.highlighted - gameState.target) === 1) {
    gameState.currentHearts += 0.5;
    updateHeartDisplay();
    gameState.score += 20;
    document.getElementById("score").textContent = gameState.score;
  } else if (Math.abs(gameState.highlighted - gameState.target) === 2) {
    gameState.currentHearts -= 0.5;
    updateHeartDisplay();
  } else if (Math.abs(gameState.highlighted - gameState.target) > 2) {
    gameState.currentHearts -= 1;
    updateHeartDisplay();
  }
}

function resetRight() {
  resetPosition(gameText.length - 1);
  setTarget(Math.floor(Math.random() * 4) + 5);
}

function resetLeft() {
  resetPosition(0);
  setTarget(gameText.length - (Math.floor(Math.random() * 4) + 7));
}

function animateEndPosition() {
  const landed = document.getElementById(`char-${gameState.highlighted}`);
  const target = document.getElementById(`char-${gameState.target}`);

  document.querySelectorAll('[id*="char"]').forEach((char) => {
    char.classList.remove(
      "char-perfect",
      "char-close",
      "char-yellow",
      "char-red-shake"
    );
  });

  let animationClass = "";
  const distance = Math.abs(gameState.highlighted - gameState.target);
  const animationDuration = 1000;

  if (distance === 0) {
    animationClass = "char-perfect";
  } else if (distance === 1) {
    animationClass = "char-close";
  } else if (distance === 2) {
    animationClass = "char-yellow";
  } else if (distance > 2) {
    animationClass = "char-red-shake";
  }

  landed.classList.add(animationClass);

  setTimeout(() => {
    landed.classList.remove(animationClass);
  }, animationDuration);
}

document.addEventListener("keydown", function (event) {
  if (gameState.isAnimating) {
    return;
  }
  if (event.key === "l" && !movingRight) {
    moveRight();
  }
  if (event.key === "h" && !movingLeft) {
    moveLeft();
  }
});

document.addEventListener("keyup", function (event) {
  if (gameState.isAnimating) {
    return;
  }
  if (event.key === "l") {
    movingRight = false;
    gameState.isAnimating = true;
    animateEndPosition();
    setTimeout(() => {
      updateScore();
      resetRight();
      gameState.isAnimating = false;
    }, 1200);
  }
  if (event.key === "h") {
    movingLeft = false;
    gameState.isAnimating = true;
    animateEndPosition();
    setTimeout(() => {
      updateScore();
      resetLeft();
      gameState.isAnimating = false;
    }, 1200);
  }
});

window.addEventListener("load", function () {
  initGame();
});

function addHeart() {}

function createHeartSVG(type) {
  const heartSVG = document.createElement("div");
  heartSVG.classList.add("heart");

  if (type === "half") {
    heartSVG.classList.add("heart-half");
  }
  heartSVG.innerHTML = heartTemplates[type];

  return heartSVG;
}

const heartTemplates = {
  full: `
    <svg width="20" height="18" viewBox="0 0 16 14">
      <rect x="2" y="1" width="2" height="2" fill="#ff6b6b"/>
      <rect x="6" y="1" width="2" height="2" fill="#ff6b6b"/>
      <rect x="1" y="3" width="2" height="2" fill="#ff6b6b"/>
      <rect x="3" y="3" width="2" height="2" fill="#ff6b6b"/>
      <rect x="5" y="3" width="2" height="2" fill="#ff6b6b"/>
      <rect x="7" y="3" width="2" height="2" fill="#ff6b6b"/>
      <rect x="9" y="3" width="2" height="2" fill="#ff6b6b"/>
      <rect x="1" y="5" width="2" height="2" fill="#ff6b6b"/>
      <rect x="3" y="5" width="2" height="2" fill="#ff6b6b"/>
      <rect x="5" y="5" width="2" height="2" fill="#ff6b6b"/>
      <rect x="7" y="5" width="2" height="2" fill="#ff6b6b"/>
      <rect x="9" y="5" width="2" height="2" fill="#ff6b6b"/>
      <rect x="2" y="7" width="2" height="2" fill="#ff6b6b"/>
      <rect x="4" y="7" width="2" height="2" fill="#ff6b6b"/>
      <rect x="6" y="7" width="2" height="2" fill="#ff6b6b"/>
      <rect x="8" y="7" width="2" height="2" fill="#ff6b6b"/>
      <rect x="3" y="9" width="2" height="2" fill="#ff6b6b"/>
      <rect x="5" y="9" width="2" height="2" fill="#ff6b6b"/>
      <rect x="7" y="9" width="2" height="2" fill="#ff6b6b"/>
      <rect x="5" y="11" width="2" height="2" fill="#ff6b6b"/>
    </svg>
  `,
  half: `
    <svg width="20" height="18" viewBox="0 0 16 14">
      <rect x="2" y="1" width="2" height="2" fill="#ff6b6b"/>
      <rect x="6" y="1" width="2" height="2" fill="#ff6b6b"/>
      <rect x="1" y="3" width="2" height="2" fill="#ff6b6b"/>
      <rect x="3" y="3" width="2" height="2" fill="#ff6b6b"/>
      <rect x="5" y="3" width="2" height="2" fill="#ff6b6b"/>
      <rect x="7" y="3" width="2" height="2" fill="#ff6b6b"/>
      <rect x="9" y="3" width="2" height="2" fill="#ff6b6b"/>
      <rect x="1" y="5" width="2" height="2" fill="#ff6b6b"/>
      <rect x="3" y="5" width="2" height="2" fill="#ff6b6b"/>
      <rect x="5" y="5" width="2" height="2" fill="#ff6b6b"/>
      <rect x="7" y="5" width="2" height="2" fill="#ff6b6b"/>
      <rect x="9" y="5" width="2" height="2" fill="#ff6b6b"/>
      <rect x="2" y="7" width="2" height="2" fill="#ff6b6b"/>
      <rect x="4" y="7" width="2" height="2" fill="#ff6b6b"/>
      <rect x="6" y="7" width="2" height="2" fill="#ff6b6b"/>
      <rect x="8" y="7" width="2" height="2" fill="#ff6b6b"/>
      <rect x="3" y="9" width="2" height="2" fill="#ff6b6b"/>
      <rect x="5" y="9" width="2" height="2" fill="#ff6b6b"/>
      <rect x="7" y="9" width="2" height="2" fill="#ff6b6b"/>
      <rect x="5" y="11" width="2" height="2" fill="#ff6b6b"/>
    </svg>
  `,
  empty: `
    <svg width="20" height="18" viewBox="0 0 16 14" class="heart-empty">
      <rect x="2" y="1" width="2" height="2"/>
      <rect x="6" y="1" width="2" height="2"/>
      <rect x="1" y="3" width="2" height="2"/>
      <rect x="3" y="3" width="2" height="2"/>
      <rect x="5" y="3" width="2" height="2"/>
      <rect x="7" y="3" width="2" height="2"/>
      <rect x="9" y="3" width="2" height="2"/>
      <rect x="1" y="5" width="2" height="2"/>
      <rect x="3" y="5" width="2" height="2"/>
      <rect x="5" y="5" width="2" height="2"/>
      <rect x="7" y="5" width="2" height="2"/>
      <rect x="9" y="5" width="2" height="2"/>
      <rect x="2" y="7" width="2" height="2"/>
      <rect x="4" y="7" width="2" height="2"/>
      <rect x="6" y="7" width="2" height="2"/>
      <rect x="8" y="7" width="2" height="2"/>
      <rect x="3" y="9" width="2" height="2"/>
      <rect x="5" y="9" width="2" height="2"/>
      <rect x="7" y="9" width="2" height="2"/>
      <rect x="5" y="11" width="2" height="2"/>
    </svg>
  `,
};
