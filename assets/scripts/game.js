let game = {
  score: 0,
  currentGame: [],
  playerMoves: [],
  choices: ["button1", "button2", "button3", "button4"],
};

// Export with curly braces because we will be exporting more than one object
// and function.

function newGame() {
  game.score = 0;
  game.currentGame = [];
  game.playerMoves = [];
  // Add event listeners:
  // Get the input elements:
  for (let circle of document.getElementsByClassName("circle")) {
    // If their data-listener attr has not yet been set to true:
    if (circle.getAttribute("data-listener") !== "true") {
      // Add the event listener on click, with a handler function with the
      // 'event' param to access the Event object:
      circle.addEventListener("click", (event) => {
        // REFACTOR: defensive - only accept clicks if the game has started:
        // REFACTOR 2: additionally check that the game is not in the status of
        // showing a turnL
        if (game.currentGame.length > 0 && !game.turnInProgress) {
          // Get the id of the element that was clicked:
          let move = event.target.getAttribute("id");
          // REFACTOR: get reference to the last button clicked and store it in
          // the game object:
          game.lastButton = move;
          // Call the lightsOn function on the clicked element:
          lightsOn(move);
          // Add the clicked button to the playerMoves array of the game object:
          game.playerMoves.push(move);
          playerTurn();
        }
      });
      // Set the data-listener attr from the default of 'false', to 'true':
      circle.setAttribute("data-listener", "true");
    }
  }

  // Call the showScore fn from inside the newGame fn:
  showScore();
  // Call addTurn fn:
  addTurn();
}

// ATTEMPT - function to show the score = should be a single line:

const showScore = () =>
  (document.getElementById("score").innerText = game.score);

// ^ CORRECT! ^

const addTurn = () => {
  // Clear the playerMoves array:
  game.playerMoves = [];
  // Push a random index from 0-3 of the choices array to the CPU moves array:
  game.currentGame.push(game.choices[Math.floor(Math.random() * 4)]);

  showTurns();
};

const lightsOn = (circ) => {
  // Light up the circle that is selected by id when called:
  document.getElementById(circ).classList.add("light");
  // Wait 400ms and turn the light off:
  setTimeout(() => {
    document.getElementById(circ).classList.remove("light");
  }, 400);
};

const showTurns = () => {
  // REFACTOR: Create state in game object to signify that a turn is in
  // progress:
  game.turnInProgress = true;
  // Establish a new counter for the game object. This will be used as the array
  // index number for our currentGame array:
  game.turnNumber = 0;
  // var to hold an intervallic callback function:
  let turns = setInterval(() => {
    // Turn the lights on for the button at the array index:
    lightsOn(game.currentGame[game.turnNumber]);
    // Then increment the counter:
    game.turnNumber++;
    // If we have reached the last turn in the array, remove the interval on the
    // variable:
    if (game.turnNumber >= game.currentGame.length) {
      clearInterval(turns);
      // REFACTOR: set the turnInProgress status to false, once the CPU turn is
      // finished:
      game.turnInProgress = false;
    }
  }, 800);
};

const playerTurn = () => {
  // Get the index of the last element of the playerMoves arr for comparison:
  let i = game.playerMoves.length - 1;
  // If the player move is correct:
  if (game.currentGame[i] === game.playerMoves[i]) {
    // && If both arrays have the same length (i.e., at end of sequence):
    if (game.currentGame.length == game.playerMoves.length) {
      // We can increment the score:
      game.score++;
      // Display it:
      showScore();
      // And add a turn:
      addTurn();
    }
  } else {
    // Do this if the answer is wrong:
    alert("Wrong move!");
    // Restart the game and run all associated functions:
    newGame();
  }
};

// Add newGame function to the export object:

module.exports = {
  game,
  newGame,
  showScore,
  addTurn,
  lightsOn,
  showTurns,
  playerTurn,
};
