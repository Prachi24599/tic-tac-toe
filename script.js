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
    /*remove the background color -- It also works
    box.classList.remove("win");*/

    //initialize the box with css properties again (adding existing classes)
    boxes[index].classList = `box box${index + 1}`;
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
  let answer = "";

  winningPositions.forEach((position) => {
    //all 3 boxes should be non-empty and exactly same in value
    if (
      (gameGrid[position[0]] !== "" ||
        gameGrid[position[1]] !== "" ||
        gameGrid[position[2]] !== "") &&
      gameGrid[position[0]] === gameGrid[position[1]] &&
      gameGrid[position[1]] === gameGrid[position[2]]
    ) {
      //check If winner is X or Y
      if (gameGrid[position[0]] === "X") answer = "X";
      else answer = "O";

      //disable pointer events for all boxes (as we have found the winner)
      boxes.forEach((box) => {
        box.style.pointerEvents = "none";
      });

      //now we have found who is winner in which boxes
      boxes[position[0]].classList.add("win");
      boxes[position[1]].classList.add("win");
      boxes[position[2]].classList.add("win");
    }
  });

  //If we have found a winner
  if (answer !== "") {
    //show thw winner in paragraph
    gameInfo.innerText = `Winner Player - ${answer}`;
    //activate newGame button
    newGameBtn.classList.add("active");
    return;
  }
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
