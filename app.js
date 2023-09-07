const gameBoard = document.querySelector("#gameboard");
const infoDisplay = document.querySelector("#info");
const startCells = ["", "", "", "", "", "", "", "", ""];
const btn = document.querySelector(".btn");
const siders = document.querySelector(".side")
const hside = document.querySelector(".hover-side")
const dside = document.querySelector(".default-side")

let go = "circle";
infoDisplay.textContent = "Circle Goes First";

function createBoard() {
  startCells.forEach((_cell, index) => {
    //we don't actually use the cell, but the index, so we put _
    //tells our code it's not used
    const cellElement = document.createElement("div");
    cellElement.classList.add("square");
    cellElement.id = index;
    cellElement.addEventListener("click", addGo);
    gameBoard.append(cellElement);
  });
}
createBoard();

function addGo(e) {
  // console.log(e.target);
  //shows the id clicked
  const drawCircle = document.createElement("div");
  drawCircle.classList.add(go);
  e.target.append(drawCircle);
  go = go === "circle" ? "cross" : "circle";
  infoDisplay.textContent = "it is now " + go + " go.";

  // CREATING AN EVENT FOR HOVER
  // const element = document.querySelector(".btn-transition");
  // const eventum = new MouseEvent("mouseover", {
  //   view: window,
  //   bubbles: true,
  //   cancelable: true,
  // });
  // // DISPATCHING THE EVENT, i.e., ACTUALLY HOVERING
  // element.dispatchEvent(eventum);

  // btn.toggleClass("default-side");
  btn.classList.toggle('btn-transition')
  // btn.toggleClass("hover-side");
  e.target.removeEventListener("click", addGo);

  checkScore();
}

function checkScore() {
  const allSquares = document.querySelectorAll(".square");
  //each time squares will be different - will have X or O
  //So we grab it each time
  // console.log(allSquares);

  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], //hor
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], //ver
    [0, 4, 8],
    [2, 4, 6], //diagonals
  ];

  winningCombos.forEach((array) => {
    const circleWins = array.every((cell) =>
      allSquares[cell].firstChild?.classList.contains("circle")
    );
    if (circleWins) {
      infoDisplay.textContent = "Circle Wins!";
      allSquares.forEach((square) =>
        square.replaceWith(square.cloneNode(true))
      );
      siders.textContent = "x < 0"
      hside.textContent= "x < 0"
      dside.textContent= "x < 0"
      return;
      //we can't really remove EventListeners - so we do this
    }
  });

  winningCombos.forEach((array) => {
    const crossWins = array.every((cell) =>
      allSquares[cell].firstChild?.classList.contains("cross")
    );
    if (crossWins) {
      infoDisplay.textContent = "Cross Wins!";
      allSquares.forEach((square) =>
        square.replaceWith(square.cloneNode(true))
      );
      siders.textContent = "Gz, X"
      hside.textContent= "Gz, X"
      dside.textContent= "Gz, X"
      return;
      //we can't really remove EventListeners - so we do this
    }
  });
}
// for each array [0,1,2] - grab each cell [1],[etc]
