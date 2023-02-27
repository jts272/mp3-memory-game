/**
 * @jest-environment jsdom
 */

// ^ ABOVE DOCBLOCK REQUIRED TO CONFIGURE THE MOCK JSDOM ENVIRONMENT ^

// IMPORTS TO BE TESTED:

const { game, newGame, showScore, addTurn } = require("../game");

// LOAD MOCK DOM BEFORE ALL TESTS:
beforeAll(() => {
  let fs = require("fs");
  let fileContents = fs.readFileSync("index.html", "utf-8");
  document.open();
  document.write(fileContents);
  document.close();
});

// TEST GAME OBJECT:

describe("game object contains correct keys", () => {
  test("score key exists", () => {
    expect("score" in game).toBe(true);
  });
  test("currentGame key exists", () => {
    expect("currentGame" in game).toBe(true);
  });
  test("playerMoves key exists", () => {
    expect("playerMoves" in game).toBe(true);
  });
  test("choices key exists", () => {
    expect("choices" in game).toBe(true);
  });
  test("choices contain correct ids", () => {
    expect(game.choices).toEqual(["button1", "button2", "button3", "button4"]);
  });
});

// TEST newGame FUNCTION, SEPARATE FROM THE GAME OBJECT:

describe("newGame works correctly", () => {
  // SETUP GAME STATE WITH DUMMY VALUES FOR TESTING PURPOSES:
  beforeAll(() => {
    game.score = 42;
    // ADD DUMMY VALUES TO TEST THE FOLLOWING ARRAYS:
    game.playerMoves = [1, 3, 5];
    game.currentGame = [2, 4, 6];
    // SET DUMMY SCORE ON THE DOM TO SEE IF IT RESETS ON NEW GAME:
    document.getElementById("score").innerText = "42";
    // CALL THE FUNCTION WE WANT TO TEST:
    newGame();
  });
  test("should set game score to 0", () => {
    expect(game.score).toEqual(0);
  });
  // TEST THAT THE FOLLOWING ARRAYS ARE EMPTIED ON FUNCTION CALL:
  test("should empty the playerMoves array", () => {
    expect(game.playerMoves).toEqual([]);
  });

  // COMMENT OUT THIS TEST - NOT IN LINE WITH GAME LOGIC:
  // test("should empty the currentGame array", () => {
  //   expect(game.currentGame).toEqual([]);
  // });
  // ^ ALTERNATIVE: Check that the Array.length === 0 ^

  // ACTUAL TEST WE WANT TO DO BELOW:

  test("should be one move in the CPU's game array", () => {
    expect(game.currentGame.length).toBe(1);
  });

  test("Should display 0 for el#score", () => {
    // EXPECT INT 0 FROM THE INITIAL GAME OBJECT:
    expect(document.getElementById("score").innerText).toEqual(0);
  });
});
