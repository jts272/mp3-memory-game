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
