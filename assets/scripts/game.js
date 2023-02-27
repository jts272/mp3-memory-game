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
}

// ATTEMPT - function to show the score = should be a single line:

const showScore = () =>
  (document.getElementById("score").innerText = game.score);

// ^ CORRECT! ^

// Add newGame function to the export object:

module.exports = { game, newGame, showScore };
