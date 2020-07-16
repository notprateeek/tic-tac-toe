const xClass = 'x';
const oClass = 'o';
const wins = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.querySelector('.board');
const result = document.querySelector('.result');
const restartBtn = document.querySelector('.restart-Btn');
const message = document.querySelector('.message');
let circleTurn;

startGame();

restartButton.addEventListener('click', startGame);

function startGame() {
  circleTurn = false;
  cellElements.forEach((cell) => {
    cell.classList.remove(xClass);
    cell.classList.remove(oClass);
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, { once: true });
  });
  setBoard();
  result.classList.remove('show');
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? oClass : xClass;
  placeMark(cell, currentClass);

  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    setBoardHoverClass();
  }
}

function endGame(draw) {
  if (draw) {
    message.innerText = 'draw';
  } else {
    message.innerText = `${circleTurn ? 'o' : 'x'} won`;
  }
  result.classList.add('show');
}

function isDraw() {
  return [...cellElements].every((cell) => {
    return cell.classList.contains(xClass) || cell.classList.contains(oClass);
  });
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurns() {
  circleTurn = !circleTurn;
}

function setBoardHoverClass() {
  board.classList.remove(xClass);
  board.classList.remove(oClass);
  if (circleTurn) {
    board.classList.add(oClass);
  } else {
    board.classList.add(xClass);
  }
}

function checkWin(currentClass) {
  return wins.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}
