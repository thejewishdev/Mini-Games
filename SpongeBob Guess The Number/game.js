// Get selected hero from localStorage
var hero = localStorage.getItem("selectedHero") || "Sponge Bob";

// Hero colors
var heroes = {
  "Sponge Bob" : "#f0e33f",
  "Patrick Star" : "#ea9999",
  "Skvidvard Tentikals" : "#90bfad",
  "Mr. Krabs" : "#ff3b3b",
  "Plankton" : "#2a6a56"
};

// Display hero
var heroDisplay = document.getElementById("hero-display");
heroDisplay.textContent = "Your hero: " + hero;
heroDisplay.style.color = heroes[hero];

// Game variables
var min = 1;
var max = 100;
var winningNum = Math.floor(Math.random() * (max - min + 1)) + min;
var attempts = 10;

// DOM elements
var guessBtn = document.getElementById("guess-btn");
var restartBtn = document.getElementById("restart-btn");
var guessInput = document.getElementById("guess-input");
var feedback = document.getElementById("feedback");
var attemptsCount = document.getElementById("attempts-count");

// Handle guess
guessBtn.addEventListener("click", function(){
    var guess = parseInt(guessInput.value);
    if(isNaN(guess) || guess < min || guess > max){
        feedback.textContent = "⚠️ Enter a number between " + min + " and " + max;
        return;
    }

    attempts--;
    attemptsCount.textContent = attempts;

    if(guess === winningNum){
        feedback.textContent = "🎉 You guessed it! The number was " + winningNum;
        feedback.style.color = "#28a745";
        guessBtn.disabled = true;
    } else if(attempts === 0){
        feedback.textContent = "💥 Game Over! The number was " + winningNum;
        feedback.style.color = "#dc3545";
        guessBtn.disabled = true;
    } else {
        feedback.textContent = guess < winningNum ? "🔼 Too low!" : "🔽 Too high!";
        feedback.style.color = "#007bff";
    }

    guessInput.value = "";
});

// Restart game
restartBtn.addEventListener("click", function(){
    winningNum = Math.floor(Math.random() * (max - min + 1)) + min;
    attempts = 10;
    attemptsCount.textContent = attempts;
    feedback.textContent = "";
    guessBtn.disabled = false;
    guessInput.value = "";
});
