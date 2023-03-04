# mp3-memory-game

A memory game using a premade front end to explore test-driven development.

Boilerplate code used from here: https://github.com/Code-Institute-Solutions/Jest_Testing_Part2/tree/main/00_boilerplate

## Testing setup

- `npm init`
- Specify `test command: jest` in setup util when prompted

[Jest Getting Started Guide](https://jestjs.io/docs/getting-started)

- `npm install --save-dev jest`
- `npm test` will result in:

```
 FAIL  assets/scripts/tests/game.test.js
  ● Test suite failed to run

    Your test suite must contain at least one test.
```

### After writing first test:

- `npm install --save-dev jest-environment-jsdom`
- Supply the following at the very top to the test file:

```
/**
 * @jest-environment jsdom
 */
```

Tests will now run in the jsdom environment.

---

### Study notes:

Tests relying on nested functions still appeared to pass, even before the nested
function was exported/imported. I have still done this part of the process
though, in line with the lesson content.

---

## Concepts covered:

### JavaScript

- Using an object-model to store game-state data `game.js:1`
- Exporting/importing objects between the source and test file `game.js:131`, `game.test.js:9`
- Cross-platform check to ensure event listeners have been attached `game.js:24`
- Deny clicks on certain game condition `game.js:83`
- Use of (event) => {} to access properties of the event (get reference, store as vars, etc.) `game.js:27`
- Getting/setting attributes `game.js:45`
- Arrow function expression syntax `game.js:57>`
- Setting timeouts and intervals
- Using an object value as an index of another value `game.js:90`

### Jest

- Spying on window events such as alerts (and their content) `game.test.js:22`
- Setting test environment state with `beforeAll()` and `afterEach()` etc.
- Using dummy values to simulate game state `game.test.js:79,197`
- Setting up mock DOM environment `game.test.js:1-3,25-31`
- Testing for existence of keys/values in an object
- Use of various Jest matchers to test with `toEqual`, `toBeCalledWith` etc.
- Check what an element's class list contains `game.test.js:130`
- Testing format:
  - Describe a block - group similar purpose tests
    - Test - what are we testing? In English, then the testing code
      - Expect - this is what we are looking for using a Jest matcher

### Build

- npm setup as [above](#testing-setup)
- Use of the Jest VS Code extension for rapid testing on save
