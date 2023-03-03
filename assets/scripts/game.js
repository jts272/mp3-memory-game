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
  // TODO:
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
    }
  }, 800);
};

// Add newGame function to the export object:

module.exports = { game, newGame, showScore, addTurn, lightsOn, showTurns };
