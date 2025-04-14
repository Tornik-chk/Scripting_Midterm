const reset = document.querySelector(".reset");
const playerDiv = document.getElementById("playerscore");
const computerDiv = document.getElementById("computerscore");
const resultTxt = document.querySelector(".resultext");
const playerimg = document.getElementById("playerimg");
const computerimg = document.getElementById("computerimg");
const historyUL = document.getElementById("history");
const rockbtn = document.getElementById("rockbtn");
const paperbtn = document.getElementById("paperbtn");
const scissorsbtn = document.getElementById("scissorsbtn");
let game = {
  playerScore: 0,
  computerScore: 0,
  playerChoose: undefined,
  computerChoose: undefined,
  roundEnd: undefined,
  curRound: 1,
};

rockbtn.addEventListener("click", () => {
  game.playerChoose = "Rock";
  playGame("Rock", computerSelection());
});
paperbtn.addEventListener("click", () => {
  game.playerChoose = "Paper";
  playGame("Paper", computerSelection());
});
scissorsbtn.addEventListener("click", () => {
  game.playerChoose = "Scissors";
  playGame("Scissors", computerSelection());
});
reset.addEventListener("click", () => ResetGame());

function computerSelection() {
  const choices = ["Rock", "Paper", "Scissors"];
  const randomIndex = Math.floor(Math.random() * 3);
  game.computerChoose = choices[randomIndex];
  return choices[randomIndex];
}

function playGame(player, computer) {
  if (player == computer) {
    gameTied();
  } else {
    switch (player) {
      case "Rock":
        if (computer === "Scissors") {
          gameWon();
        } else {
          gameLost();
        }
        break;
      case "Paper":
        if (computer === "Rock") {
          gameWon();
        } else {
          gameLost();
        }
        break;
      case "Scissors":
        if (computer === "Paper") {
          gameWon();
        } else {
          gameLost();
        }
        break;
      default:
        console.log("invalid input");
    }
  }
  playerimg.src = `Images/${game.playerChoose}.png`;
  computerimg.src = `Images/${game.computerChoose}.png`;
  addToHistroy();
  playerDiv.textContent = `PLAYER SCORE: ${game.playerScore}`;
  computerDiv.textContent = `COMPUTER SCORE: ${game.computerScore}`;

  game.curRound += 1;
}

function gameTied() {
  game.roundEnd = "🤝 It's a Draw!";
}
function gameLost() {
  game.computerScore += 1;
  game.roundEnd = "🏆 Player 2 Wins!";
  resultTxt.textContent = "YOU LOST ! 😂";
}
function gameWon() {
  game.playerScore += 1;
  game.roundEnd = "🏆 Player 1 Wins!";
  resultTxt.textContent = "YOU WON ! 🎉";
}
function addToHistroy() {
  let item = document.createElement("li");
  item.textContent = `Round ${game.curRound}: Player 1 - ${game.playerChoose}, Player 2 - ${game.computerChoose} -> ${game.roundEnd}`;
  historyUL.appendChild(item);
}

function ResetGame() {
  game.playerScore = 0;
  game.computerScore = 0;
  game.playerChoose = undefined;
  game.computerChoose = undefined;
  game.roundEnd = undefined;
  game.curRound = 1;

  playerDiv.textContent = `PLAYER SCORE: 0`;
  computerDiv.textContent = `COMPUTER SCORE: 0`;
  playerimg.src = "";
  computerimg.src = "";
  historyUL.innerHTML = "";
}
