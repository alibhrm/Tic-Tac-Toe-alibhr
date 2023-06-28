const playerText = document.getElementById("playerText");
const restartBtn = document.getElementById("restartBtn");
const boxes = Array.from(document.getElementsByClassName("box"));
const winnerIndicator = getComputedStyle(document.body).getPropertyValue(
  "--winning-blocks"
);
const oText = "O";
const xText = "X";
let currentPlayer = xText;
let spaces = Array(9).fill(null);
const startGame = () => {
  boxes.forEach((box) => box.addEventListener("click", boxClicked));
};

function boxClicked(e) {
  const id = e.target.id;
  if (!spaces[id]) {
    spaces[id] = currentPlayer;
    e.target.innerText = currentPlayer;

    if (Winner() !== false) {
      playerText.innerText = `${currentPlayer} has won!`;
      let winningBlocks = Winner();
      winningBlocks.map(
        (box) => (boxes[box].style.backgroundColor = winnerIndicator)
      );
      return;
    }else if (spaces !== null && Winner() == false) {
        playerText.innerText = "Draw";
      }
    currentPlayer = currentPlayer == xText ? oText : xText;
  } 
}
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
function Winner() {
  for (const condition of winningCombos) {
    let [a, b, c] = condition;
    if (spaces[a] && spaces[a] == spaces[b] && spaces[a] == spaces[c]) {
      return [a, b, c];
    }
  }
  return false;
}
restartBtn.addEventListener("click", restart);
startGame();
function restart() {
  spaces.fill(null);
  boxes.forEach((box) => {
    box.innerText = "";
    box.style.backgroundColor = "";
  });
  playerText.innerText = "Tic Tac Toe";
  currentPlayer = xText;
}
