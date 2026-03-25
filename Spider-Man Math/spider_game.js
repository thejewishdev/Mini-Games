var hero = localStorage.getItem("selectedHero")

var heroes = {
  "Peter Parker": {
    color: "#E23636",
    bg: "#2B3784"
  },
  "Miles Morales": {
    color: "#ff0000",
    bg: "#1a1c24"
  },
  "Carnage": {
    color: "#000000",
    bg: "#2b0000"
  },
  "Venom": {
    color: "#ffffff",
    bg: "#0a0a0a"
  }
}

var selected = heroes[hero] || {
  color: "red",
  bg: "#111"
}

// Hero name
document.querySelector("header").innerText = hero || "Spider Hero"

// Box + button styling
document.querySelector(".game-box").style.borderColor = selected.color
document.querySelector(".game-box").style.boxShadow = "0 0 20px " + selected.color
document.querySelector("button").style.background = selected.color

// ✅ Background color
document.body.style.background = selected.bg



let num1, num2, correctAnswer, operator;
let score = 0;
let attempts = 3;

function generateQuestion() {
  const ops = ['+', '-', '*', '/'];
  operator = ops[Math.floor(Math.random() * ops.length)];

  if (operator === '/') {
    // We pick the answer first to ensure division is always a whole number
    let possibleAnswer = Math.floor(Math.random() * 9) + 1;
    num2 = Math.floor(Math.random() * 9) + 1;
    num1 = possibleAnswer * num2;
    correctAnswer = possibleAnswer;
  } else if (operator === '*') {
    num1 = Math.floor(Math.random() * 10);
    num2 = Math.floor(Math.random() * 10);
    correctAnswer = num1 * num2;
  } else if (operator === '-') {
    num1 = Math.floor(Math.random() * 20) + 10;
    num2 = Math.floor(Math.random() * 10);
    correctAnswer = num1 - num2;
  } else {
    num1 = Math.floor(Math.random() * 20);
    num2 = Math.floor(Math.random() * 20);
    correctAnswer = num1 + num2;
  }

  document.getElementById("question").innerText = `${num1} ${operator} ${num2}`;
  document.getElementById("answer").value = "";
}

function checkAnswer() {
  const userAnswer = parseInt(document.getElementById("answer").value);

  if (userAnswer === correctAnswer) {
    score++;
    alert("Great Shot! 🕷️");
    generateQuestion();
  } else {
    attempts--;
    if (attempts > 0) {
      alert(`Missed! You have ${attempts} attempts left.`);
    } else {
      alert(`Game Over! Final Score: ${score}. Try again?`);
      score = 0;
      attempts = 3;
      generateQuestion();
    }
  }

  updateDisplay();
}

function updateDisplay() {
  document.getElementById("score").innerText = "Score: " + score;
  // This updates the hearts: 3 attempts = ❤️❤️❤️
  document.getElementById("lives").innerText = "❤️".repeat(attempts);
}

// Start game
generateQuestion();
