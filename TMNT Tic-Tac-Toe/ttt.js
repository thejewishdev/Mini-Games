var hero = localStorage.getItem("selectedHero");

var turtles = {
  "Leo" : "#00aae6",
  "Mickey" : "#ffa500",
  "Raph" : "#e3331c",
  "Dony" : "#aa1bdd"
};

var cells = document.querySelectorAll("td");
var resetButton = document.querySelector("#reset");
var startButton = document.querySelector("#start");
var gameStarted = false;
var aiTimeout; // Variable to track the AI's "thinking" timer

// ✅ Winning combinations
var winCombos = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

// --- 🧠 AI LOGIC HELPERS ---

function findWinningMove(player) {
  for (let combo of winCombos) {
    const pieces = combo.map(index => cells[index].textContent);
    if (pieces.filter(val => val === player).length === 2 &&
        pieces.filter(val => val === " ").length === 1) {
      return combo[pieces.indexOf(" ")];
    }
  }
  return null;
}

// --- 🎮 GAME FUNCTIONS ---

// This handles both Start and Reset now
function startGame() {
  // Clear any pending AI moves from previous rounds
  clearTimeout(aiTimeout);

  boardReset(cells);
  gameStarted = true;

  // Shredder makes the first move!
  aiTimeout = setTimeout(() => {
    aiPick(cells);
  }, 400);
}

function boardReset(board) {
  for (var cell of board) {
    cell.textContent = " ";
  }
}

function checkWinner(player) {
  return winCombos.some(combo => {
    return combo.every(index => {
      return cells[index].textContent === player;
    });
  });
}

function checkDraw() {
  return [...cells].every(cell => cell.textContent !== " ");
}

function aiPick(boardCells) {
  if (!gameStarted) return;

  let targetIndex = null;

  // 1. WIN: Can Shredder win?
  targetIndex = findWinningMove("X");

  // 2. BLOCK: Is the Hero about to win?
  if (targetIndex === null) {
    targetIndex = findWinningMove("O");
  }

  // 3. CENTER: Grab the middle
  if (targetIndex === null && boardCells[4].textContent === " ") {
    targetIndex = 4;
  }

  // 4. RANDOM: Pick whatever is left
  if (targetIndex === null) {
    var emptyIndexes = [];
    for (let i = 0; i < boardCells.length; i++) {
      if (boardCells[i].textContent === " ") emptyIndexes.push(i);
    }
    if (emptyIndexes.length === 0) return;
    targetIndex = emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
  }

  var cell = boardCells[targetIndex];
  cell.textContent = "X";
  cell.style.color = "#a5a8bb";

  if (checkWinner("X")) {
    alert("Shredder Wins!");
    gameStarted = false;
    return;
  }

  if (checkDraw()) {
    alert("Draw!");
    gameStarted = false;
  }
}

function playerMove(cell) {
  if (cell.textContent !== " " || !gameStarted) return;

  cell.textContent = "O";
  cell.style.color = turtles[hero] || "#000";

  if (checkWinner("O")) {
    alert(hero + " Wins!");
    gameStarted = false;
    return;
  }

  if (checkDraw()) {
    alert("Draw!");
    gameStarted = false;
    return;
  }

  // AI counter-attacks
  aiTimeout = setTimeout(() => {
    aiPick(cells);
  }, 500);
}

// --- 🖱️ EVENT LISTENERS ---

// Both buttons now trigger the same "Start/AI First" logic
startButton.addEventListener("click", startGame);
resetButton.addEventListener("click", startGame);

cells.forEach(cell => {
  cell.addEventListener("click", () => {
    playerMove(cell);
  });
});
