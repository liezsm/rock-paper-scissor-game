const rulesBtn = document.querySelector("[data-rules-btn]");

const closeBtn = document.querySelector("[data-close-btn]");

const modal = document.querySelector("[data-modal");
const scoreNumber = document.getElementById("score");

// todo fire a click even on rule button to show the rules modal

rulesBtn.addEventListener("click", (e) => {
  modal.classList.add("show-modal");
});

closeBtn.addEventListener("click", () => {
  modal.classList.remove("show-modal");
});

//  todo user picked a choice
const gameContainer = document.querySelector(".game-container");
const resultContainer = document.querySelector(".result");

const CHOICES = ["paper", "rock", "scissors"];
const choicesBtns = document.querySelectorAll("[data-armor");

// todo function to dynamically change the image depending on player's choices
function choiceIntoUI(player, picked) {
  // const parent = document.querySelector(`.${player}-picked`);
  // console.log(`.${player}-picked`);
  document
    .querySelector(`[data-${player}-choice]`)
    .classList.remove("result-item");
  document.querySelector(`[data-${player}-choice]`).innerHTML = `
    <button class="choice-btn" data-armor="${picked}">
        
            <div class="choice-img " data-${picked}>
              <img src="./images/icon-${picked}.svg" alt=${picked} />
            </div>
          </button>
    `;

  const playerText = player == "user" ? "YOU" : "THE HOUSE";
  document.querySelector(
    `[data-${player}-pick]`
  ).innerText = `${playerText} PICKED`;
}

// todo fire a click event what the user's choice is

choicesBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const userChoice = e.currentTarget.dataset.armor;

    choiceIntoUI("user", userChoice);
    gameContainer.style.display = "none";
    resultContainer.classList.toggle("show-result");
    const computer = compChoice();

    // todo i used settimeout to create a loading effect while waiting for the computer's choice
    setTimeout(() => {
      choiceIntoUI("comp", computer);
    }, 1500);
    const result = whoIsTheWinner(userChoice, computer);
    console.log(userChoice, computer, result);
    displayResult(result);

    // console.log(updateScore(result));
  });
});

// todo random choice for computer
function compChoice() {
  const compChoice = CHOICES[Math.floor(Math.random() * CHOICES.length)];
  return compChoice;
}

// TODO determine who is the winner

function whoIsTheWinner(user, computer) {
  const logic = {
    paper: {
      scissors: "You lose",
      rock: "You win",
      paper: "IT'S A DRAW!",
    },
    scissors: {
      paper: "You win",
      rock: "You lose",
      scissors: "IT'S A DRAW!",
    },
    rock: {
      scissors: "You win",
      paper: "You lose",
      rock: "IT'S A DRAW!",
    },
  };

  return logic[user][computer];
}

// todo click the play again button

const playAgainBtn = document.querySelector("[data-play-again-btn]");

playAgainBtn.addEventListener("click", (e) => {
  console.log(e.currentTarget);
  gameContainer.style.display = "grid";
  resultContainer.classList.toggle("show-result");
  document.querySelector(".show-winner").classList.toggle("hidden");
  reset();
});

// todo function for the result

function displayResult(resultOfTheGame) {
  setTimeout(() => {
    document.querySelector("[data-result-text]").innerHTML = resultOfTheGame;
    const resultDiv = document.querySelector(".show-winner");
    resultDiv.classList.toggle("hidden");

    updateScore(resultOfTheGame);
    const winner = glowEffect(resultOfTheGame);
    winner &&
      document
        .querySelector(`[data-${winner}-choice]`)
        .classList.toggle("winner");
  }, 2000);
}

// todo update the score

function updateScore(result) {
  const scoreStored = scoreNumber.innerText;
  console.log(scoreStored);

  const setScore = {
    "IT'S A DRAW!": scoreStored,
    "You win": parseInt(scoreStored) + 1,
    "You lose": parseInt(scoreStored) - 1,
  };
  const updatedScore = setScore[result];
  if (updatedScore < 0) {
    scoreNumber.innerHTML = 0;
  } else {
    scoreNumber.innerHTML = updatedScore;
  }
}

function glowEffect(result) {
  const winnerIdentifier = {
    "You win": "user",
    "You lose": "comp",
  };

  const winner = winnerIdentifier[result];

  return winner;
}

// todo clear /reset all contents when play again clicked

function reset() {
  // cirlce background
  document.querySelector(`[data-user-choice]`).classList.add("result-item");
  document.querySelector(`[data-comp-choice]`).classList.add("result-item");
  document.querySelector(`[data-comp-choice]`).classList.remove("winner");
  document.querySelector(`[data-user-choice]`).classList.remove("winner");

  document.querySelector(`[data-user-choice]`).innerHTML = "";
  document.querySelector(`[data-comp-choice]`).innerHTML = "";
  document.querySelector("[data-user-pick]").innerText = " ";
  document.querySelector("[data-comp-pick]").innerText = " ";
}
