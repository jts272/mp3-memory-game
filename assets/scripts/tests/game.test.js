/**
 * @jest-environment jsdom
 */

// ^ ABOVE DOCBLOCK REQUIRED TO CONFIGURE THE MOCK JSDOM ENVIRONMENT ^

// IMPORTS TO BE TESTED:

const {
  game,
  newGame,
  showScore,
  addTurn,
  lightsOn,
  showTurns,
  playerTurn,
} = require("../game");

// Setup Jest to spy on an instance of a window alert message:
// Spy on: (object, method). Divert it to an empty function.

jest.spyOn(window, "alert").mockImplementation(() => {});

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

  // CHALLENGE: Check that the 'lastButton' and 'turnInProgress' keys exist in
  // the game object:

  // ATTEMPT:

  test("lastButton key exists", () => {
    expect("lastButton" in game).toBe(true);
  });
  test("turnInProgress key exists", () => {
    expect("turnInProgress" in game).toBe(true);
  });

  // ^ CORRECT! ^

  // ANSWER - ADDITIONAL TEST:
  test("turnInProgress key value is 'false'", () => {
    expect(game.turnInProgress).toBe(false);
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

describe("gameplay works correctly", () => {
  // RUNS BEFORE EACH TEST IS RUN, NOT ALL: (Resets each iteration/test)
  beforeEach(() => {
    game.score = 0;
    game.currentGame = [];
    game.playerMoves = [];
    addTurn(); // Tests should start with one element in currentGame arr
  });
  // RESET STATE AFTER EACH TEST (RITE principle to Isolate each test)
  afterEach(() => {
    game.score = 0;
    game.currentGame = [];
    game.playerMoves = [];
  });
  test("addTurn adds a new turn to the game", () => {
    addTurn(); // Call the function we want to test functionality of
    expect(game.currentGame.length).toBe(2);
  });
  test("should add correct class to light up the buttons", () => {
    // Reference the element with the id of the first item in the currentGame
    // array:
    let button = document.getElementById(game.currentGame[0]);
    // Call the lights on function on this element:
    lightsOn(game.currentGame[0]);
    // Check that the 'light' class has been added to this element with new
    // matcher:
    expect(button.classList).toContain("light");
  });
  test("showTurns should update game.turnNumber", () => {
    game.turnNumber = 42;
    showTurns();
    expect(game.turnNumber).toBe(0);
  });
  // ATTEMPT: TEST THE KEY IS IN THE GAME OBJECT ONCE NEW GAME IS RUN:
  // My prediction is that the addTurn function (setup in beforeEach), which
  // calls the showTurns function, will initialize and assign the key/value:
  test("turnNumber key exists", () => {
    expect("turnNumber" in game).toBe(true);
  });
  // ANSWER: ADD THE KEY TO THE GLOBAL GAME OBJ AND INITIALIZE TO 0; USE THIS
  // TEST IN THE SECTION WITH THE OTHER KEY EXISTS TESTS.
  test("expect data-listener to be true", () => {
    // Get the elements that share the class 'circle' (i.e., the input elements)
    const elements = document.getElementsByClassName("circle");
    // Loop to address each element with the 'circle' class:
    for (let element of elements) {
      // Check for data-listener attr value to be 'true' ('false' by default in
      // HTML). We are checking that the string content is the same.
      expect(element.getAttribute("data-listener")).toEqual("true");
    }
  });
  test("should increment the score if the turn is correct", () => {
    // Use the 'correct' turn from the currentGame arr, which will contain one
    // turn from the beforeEach() function:
    game.playerMoves.push(game.currentGame[0]);
    // Then call the function for the player's turn:
    playerTurn();
    // Expect the score to have increased when the player is correct:
    expect(game.score).toBe(1);
  });
  test("should call an alert if the move is wrong", () => {
    // Purposely push an incorrect string into the playerMoves arr:
    game.playerMoves.push("wrong");
    playerTurn();
    // Expect the alert to display the following string:
    expect(window.alert).toBeCalledWith("Wrong move!");
  });
  // CHALLENGE: Check that the turn in progress key is set to 'true' whilst the
  // showTurns() function is running:

  // ATTEMPT:
  test("turnInProgress key is set to true during showTurns function", () => {
    // Call the function we are testing:
    showTurns();
    // What we are looking for:
    expect(game.turnInProgress).toEqual(true);
    // ^ CORRECT! ^
  });

  test("clicking during computer sequence should fail", () => {
    // Call the function during which input should be disabled:
    showTurns();
    // Ensure there is no 'last button' pressed:
    game.lastButton = "";
    // Simulate clicking button 2:
    document.getElementById("button2").click();
    // We expect that the lastButton var should still be blank (i.e., clicks are
    // disabled):
    expect(game.lastButton).toEqual("");
  });

  // FURTHER TESTING SUGGESTIONS: game-state keys are reset on a new game:

  // ATTEMPT:

  test("lastButton is emptied on new game", () => {
    // Give a simulated button press:
    document.getElementById("button3").click();
    // Call a new game:
    newGame();
    // The lastButton var should now be empty:
    expect(game.lastButton).toEqual("");
  });
});
