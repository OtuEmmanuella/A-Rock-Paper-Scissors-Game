const rockBtn = document.getElementById("rock-btn")
const paperBtn = document.getElementById("paper-btn")
const scissorsBtn = document.getElementById("scissors-btn")
const resetBtn = document.getElementById("reset-btn")
const messageEl = document.getElementById("message-el")
const resultMessage = document.getElementById("result-message")
const scoreMessage = document.getElementById("score-message")
let message = ""

rockBtn.addEventListener("click", function () {
  playerGame("rock")
})

paperBtn.addEventListener("click", function () {
  playerGame("paper")
})

scissorsBtn.addEventListener("click", function () {
  playerGame("scissors")
})

resetBtn.addEventListener("click", function () {
  score.win = 0
  score.losses = 0
  score.ties = 0
  localStorage.removeItem("score")
  messageEl.textContent = ""
  resultMessage.textContent = ""
  updateScore()
})

let score = JSON.parse(localStorage.getItem("score")) || {
  win: 0,
  losses: 0,
  ties: 0,
}

updateScore()

function playerGame(playerMove) {
  const computerMove = getRandomMove()

  let result = ""
  if (playerMove === "rock") {
    if (computerMove === "rock") {
      result = "Tie!"
    } else if (computerMove === "paper") {
      result = "You lose!"
    } else if (computerMove === "scissors") {
      result = "You win!"
    }
  } else if (playerMove === "paper") {
    if (computerMove === "rock") {
      result = "You win!"
    } else if (computerMove === "paper") {
      result = "Tie!"
    } else if (computerMove === "scissors") {
      result = "You lose!"
    }
  } else if (playerMove === "scissors") {
    if (computerMove === "rock") {
      result = "You lose!"
    } else if (computerMove === "paper") {
      result = "You win!"
    } else if (computerMove === "scissors") {
      result = "Tie!"
    }
  }

  if (result === "You win!") {
    score.win += 1
  } else if (result === "You lose!") {
    score.losses += 1
  } else if (result === "Tie!") {
    score.ties += 1
  }

  localStorage.setItem("score", JSON.stringify(score))

  updateScore()

  resultMessage.textContent = result

  message = `You <img
  class="move-icon"
  src="emojis/${playerMove}-emoji.png">
  <img
  class="move-icon"
  src="emojis/${computerMove}-emoji.png">
  computer`
  messageEl.innerHTML = message
}

function updateScore() {
  scoreMessage.textContent = `Wins: ${score.win}, losses: ${score.losses}, Ties: ${score.ties}`
}

function getRandomMove() {
  let randomNumber = Math.random()
  let computerMove = ""
  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "rock"
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "paper"
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = "scissors"
  }

  return computerMove
}
