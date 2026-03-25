var hero = localStorage.getItem("selectedHero")

var turtles = {
  "Leo" : "#00aae6",
  "Mickey" : "#ffa500",
  "Raph" : "#e3331c",
  "Dony" : "#aa1bdd"
}

var cells = document.querySelectorAll("td")
var resetButton = document.querySelector("#reset")
var startButton = document.querySelector("#start")
var gameStarted = false



// ✅ Winning combinations (indexes of cells)
var winCombos = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];



// Start the game
function startGame() {
  gameStarted = true
  boardReset(cells)
  alert("Game Started!")
}


// Reset board
function boardReset(board) {
  for (var cell of board) {
    cell.textContent = " "
  }
  gameStarted = true
}



// ✅ Check winner
function checkWinner(player) {
  return winCombos.some(combo => {
    return combo.every(index => {
      return cells[index].textContent === player
    })
  })
}



// ✅ Check draw
function checkDraw() {
  return [...cells].every(cell => cell.textContent !== " ")
}



// AI turn
function aiPick(boardCells){

    var emptyCells = []

    for (let i = 0; i < boardCells.length; i++) {
      if (boardCells[i].textContent === " ") {
        emptyCells.push(boardCells[i])
      }
    }

    if (emptyCells.length === 0) return;

    var randomIndex = Math.floor(Math.random() * emptyCells.length);
    var cell = emptyCells[randomIndex];

    cell.textContent = "X";
    cell.style.color = "#a5a8bb";


    // ✅ Check if AI wins
    if (checkWinner("X")) {
      alert("Shredder Wins!")
      gameStarted = false
      return
    }

    // ✅ Check draw
    if (checkDraw()) {
      alert("Draw!")
      gameStarted = false
    }
}



// Player turn
function playerMove(cell) {
  if (cell.textContent !== " " || !gameStarted) return;

  cell.textContent = "O";
  cell.style.color = turtles[hero];


  // ✅ Check if player wins
  if (checkWinner("O")) {
    alert(hero + " Wins!")
    gameStarted = false
    return
  }

  // ✅ Check draw before AI moves
  if (checkDraw()) {
    alert("Draw!")
    gameStarted = false
    return
  }

  // AI move
  aiPick(cells);
}




// Event listeners
startButton.addEventListener("click", startGame);

resetButton.addEventListener("click", function() {
  boardReset(cells);
});

cells.forEach(cell => {
  cell.addEventListener("click", () => {
    if (!gameStarted) return;
    playerMove(cell);
  });
});
