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



// Game logic
let num1, num2, correctAnswer
let score = 0

function generateQuestion() {
  num1 = Math.floor(Math.random() * 10)
  num2 = Math.floor(Math.random() * 10)

  correctAnswer = num1 + num2

  document.getElementById("question").innerText = num1 + " + " + num2
  document.getElementById("answer").value = ""
}

function checkAnswer() {
  let userAnswer = parseInt(document.getElementById("answer").value)

  if (userAnswer === correctAnswer) {
    score++
    alert("Nice! 🕷️")
  } else {
    alert("Oops! The correct answer was " + correctAnswer)
  }

  document.getElementById("score").innerText = "Score: " + score
  generateQuestion()
}

// Start game
generateQuestion()
