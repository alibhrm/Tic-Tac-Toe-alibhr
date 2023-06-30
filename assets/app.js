const PLAYER1 = "X";
const PLAYER2 = "O";
const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6] // Diagonals
];

let currentPlayer = PLAYER1;
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

const cells = document.querySelectorAll(".cell");
const resetButton = document.getElementById("reset");
const player1ScoreElement = document.getElementById("player1-score");
const player2ScoreElement = document.getElementById("player2-score");
const scoreboardElement = document.getElementById("scoreboard");
const messageElement = document.getElementById("message");

function handleCellClick(cell, cellIndex) {
  if (gameState[cellIndex] || !gameActive) {
    return;
  }

  gameState[cellIndex] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer);

  if (checkForWin()) {
    endGame(false);
  } else if (checkForDraw()) {
    endGame(true);
  } else {
    switchPlayer();
  }
}

function switchPlayer() {
  currentPlayer = currentPlayer === PLAYER1 ? PLAYER2 : PLAYER1;
  scoreboardElement.setAttribute("data-player", currentPlayer);
  messageElement.textContent = `It's ${currentPlayer}'s turn`;
}

function checkForWin() {
  for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
    const [a, b, c] = WINNING_COMBINATIONS[i];
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      return true;
    }
  }
  return false;
}

function checkForDraw() {
  return !gameState.includes("");
}

function endGame(isDraw) {
  gameActive = false;
  if (isDraw) {
    messageElement.textContent = "It's a draw!";
  } else {
    messageElement.textContent = `${currentPlayer} wins!`;
    if (currentPlayer === PLAYER1) {
      player1ScoreElement.textContent++;
    } else {
      player2ScoreElement.textContent++;
    }
  }
}

function resetGame() {
  currentPlayer = PLAYER1;
  gameActive = true;
  gameState = ["", "", "", "", "", "", "", "", ""];
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove(PLAYER1, PLAYER2);
  });
  scoreboardElement.setAttribute("data-player", currentPlayer);
  messageElement.textContent = `It's ${currentPlayer}'s turn`;
}

cells.forEach((cell, index) => {
  cell.addEventListener("click", () => handleCellClick(cell, index));
});

resetButton.addEventListener("click", resetGame);