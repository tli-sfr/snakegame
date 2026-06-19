# Specification

## Requirement Clarification

This file captures what the game must do before implementation begins. Codex should update this file when requirements change or when ambiguity is resolved.

## Problem Statement

Create a browser-based TypeScript Snake game that is small enough for practice but complete enough to exercise an AI native SDLC process, including install, build, type-check, unit test, and browser end-to-end regression steps.

## Target User

A player who wants a simple browser Snake game with a visible player name, score, and familiar game rules.

## Functional Requirements

### Start Screen

- The app opens to a start screen.
- The start screen contains a player name input.
- The start screen contains a start button.
- Starting is allowed only when the player name is not blank.
- Pressing Enter while focused on the name input may start the game if the name is valid.
- The start screen works when the development server is running.
- The start screen works after a production build is served in a browser.

### Game Screen

- The game screen displays the player name.
- The game screen displays the current score.
- The name and score appear in the top-right status area.
- The release version number appears at the bottom of the game screen.
- The remaining panel area is used for gameplay.
- The game area is rendered in the browser, preferably with HTML Canvas.
- The snake starts at a predictable initial position.
- The first food item appears inside the game area and not on the snake.

### Snake Rules

- The snake moves continuously on a grid.
- Arrow keys or WASD control direction.
- The snake cannot reverse directly into itself.
- Eating food increases the score.
- Eating food increases the snake length.
- A new food item appears after each food item is eaten.
- Hitting a wall ends the game.
- Hitting the snake's own body ends the game.

### Game Over

- Game over stops snake movement.
- Game over shows the final player name and score.
- The player can restart from the game over screen.
- Restarting returns to a fresh game state.

## Build Requirements

- The project uses npm scripts for common commands.
- `npm run dev` starts a local browser development server.
- `npm run typecheck` verifies TypeScript types.
- `npm test` runs unit tests for game rules.
- `npm run build` creates a production browser bundle.
- `npm run test:e2e` runs browser end-to-end tests for the main user flow.

## Nonfunctional Requirements

- The game should run locally without network access after dependencies are installed.
- The gameplay should feel responsive at normal desktop browser frame rates.
- Game rules should be testable without launching the full browser UI.
- TypeScript should catch common type errors during the build or type-check step.
- Code should be simple enough for a beginner to read.
- UI text should fit cleanly in the browser window.

## Acceptance Criteria

1. Given the app starts, when no name has been entered, then the player sees a name input and start button.
2. Given the name is blank, when the player clicks start, then the game does not begin.
3. Given the name is valid, when the player starts, then the game screen appears with the name and score.
4. Given the snake eats food, then the score increases and the snake becomes longer.
5. Given the snake hits a wall, then the game enters game over state.
6. Given the snake hits itself, then the game enters game over state.
7. Given game over is visible, when the player restarts, then a new game begins with score 0.
8. Given the game screen is visible, then the player sees the release version number at the bottom of the game screen.
9. Given the project is ready for PR, when the type-check command runs, then it completes successfully.
10. Given the project is ready for PR, when the build command runs, then the browser bundle is created successfully.
11. Given the project is ready for PR, when end-to-end tests run, then the start-to-game-over flow is verified in a browser.

## Out of Scope for Version 1

- Online leaderboard
- Sound effects
- Mobile support
- Multiplayer mode
- Difficulty selection
- Persistent saved scores
- Progressive Web App installation

## Open Questions

- Resolved for version 1: score increases by 1 per food.
- Resolved for version 1: snake speed stays constant.
- Resolved for version 1: restart starts a fresh game with the same player name.
- Resolved for version 1: Chromium is the required end-to-end test target.

## Requirement Change Process

For every requirement change:

1. Add or update the relevant section in this file.
2. Identify whether the change is major, minor, or patch using `RELEASE.md`.
3. Update architecture notes if the change affects structure.
4. Add or update tests before completing the implementation.
5. Confirm whether build or browser end-to-end coverage must change.
