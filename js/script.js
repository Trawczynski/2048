"use strict";

// -----------------------------------------------------------------------

// PREAMBULO
const author = "Alan Trawczynski";
document.getElementById("author").innerHTML = author;

// -----------------------------------------------------------------------

// COMENTARIOS
// ...

// -----------------------------------------------------------------------

// VARIABLES
//    1. Acceso a elementos HTML con interacción (e interacciones asociadas)
//    2. Acceso a elementos HTML informativos
//    3. Uso general
const boardDisplay = document.getElementById("board"),
  newGameButton = document.getElementById("newGameButton"),
  sizeSlider = document.getElementById("boardSizeSlider");

const sizeDisplay = document.getElementById("boardSizeValue"),
  scoreDisplay = document.getElementById("score"),
  gameoverDisplay = document.getElementById("gameoverScreen");

let game = new Game(boardDisplay);
const boardDisplaySize = 0.6; // [0, 1]: portion of window size

// -----------------------------------------------------------------------

// FUNCIONES
//    1. Start
//    2. Auxiliares
//    3. Gestores de eventos

function start() {
  console.log("starting...");
  addEventListeners();
  updateDisplay();
}

function addEventListeners() {
  document.addEventListener("keyup", controlKeyUp);
  window.addEventListener("resize", controlResize);
  newGameButton.addEventListener("click", newGame);
  sizeSlider.addEventListener("input", controlSizeSlider);
}

function updateDisplay() {
  scoreDisplay.innerHTML = game.score;
  sizeDisplay.innerHTML = game.size;
  sizeSlider.value = game.size;
  boardDisplay.style.gridTemplate = `repeat(${game.size}, 1fr) / repeat(${game.size}, 1fr)`;
  controlResize();
}

// Key up event controller
function controlKeyUp(e) {
  if (game.isGameover) {
    return;
  }

  switch (e.keyCode) {
    case 39:
      game.moveRight();
      break;
    case 37:
      game.moveLeft();
      break;
    case 38:
      game.moveUp();
      break;
    case 40:
      game.moveDown();
      break;
  }

  if (game.isGameover) {
    gameoverDisplay.classList.add("gameover-message--visible");
  }
  scoreDisplay.innerHTML = game.score;
}

function showGameover() {
  gameoverDisplay.classList.add("gameover-message--visible");
}

function newGame() {
  game.newGame(sizeSlider.valueAsNumber);
  gameoverDisplay.classList.remove("gameover-message--visible");
  updateDisplay();
}

function controlResize() {
  const boardGap = (boardDisplay.clientWidth * 0.2) / game.size,
    squareFontSize = (boardDisplay.clientWidth * 0.5) / game.size;

  boardDisplay.style.gap = boardGap + "px";
  Array.from(boardDisplay.children).forEach(
    (child) => (child.style.fontSize = squareFontSize + "px")
  );
}

function controlSizeSlider() {
  sizeDisplay.innerHTML = sizeSlider.value;
}

// -----------------------------------------------------------------------

start();