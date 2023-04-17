"use strict";
const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

//create a function to initialize a game
function initGame() {
  currentPlayer = "X";
  gameGrid = ["", "", "", "", "", "", "", "", ""];
  //Need to update(make it empty) on UI also
  boxes.forEach((box, index) => {
    box.innerText = "";
    boxes[index].style.pointerEvents = "all";
  });
  newGameBtn.classList.remove("active");
  gameInfo.innerText = `Current Player - ${currentPlayer}`;
}
initGame();

function swapTurn() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  //update the current player on UI too
  gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver() {
  newGameBtn.classList.add("active");
}

function handleClick(index) {
  if (gameGrid[index] === "") {
    //update on UI
    boxes[index].innerText = currentPlayer;
    //update in logic
    gameGrid[index] = currentPlayer;
    boxes[index].style.pointerEvents = "none";
    //swap the turn
    swapTurn();
    //check if game is over
    checkGameOver();
  }
}

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    //console.log(index);
    handleClick(index);
  });
});

//reset game when clicked on newGameBtn
newGameBtn.addEventListener("click", initGame);
