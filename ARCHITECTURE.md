# Architecture

## Planning And Design

The game should separate pure game rules from browser rendering. This keeps the Snake logic testable and lets Codex make changes without coupling every rule to DOM events or Canvas drawing.

## Proposed Components

```text
src/main.ts
  Boots the browser app, wires DOM events, and starts the game loop.

src/ui/screens.ts
  Renders the start screen, game screen shell, status area, and game over screen.

src/ui/canvasRenderer.ts
  Draws the snake, food, and game area on an HTML Canvas.

src/game/engine.ts
  Owns game state transitions and coordinates rule execution.

src/game/rules.ts
  Contains pure rule functions for movement, collisions, growth, scoring, and food placement.

src/game/models.ts
  Defines TypeScript types such as Position, Direction, Snake, Food, and GameState.
```

## State Model

The game should have explicit states:

- `START`: player enters a name.
- `RUNNING`: snake moves, food appears, score changes.
- `GAME_OVER`: final score is shown and restart is available.

## Core Data

```text
Player
  name: string

GameState
  mode: START | RUNNING | GAME_OVER
  playerName: string
  score: number
  snake: Position[]
  direction: Direction
  food: Position
  gridWidth: number
  gridHeight: number
```

## Game Loop

1. Read browser input events.
2. Update direction if the requested direction is legal.
3. Advance the snake on a fixed timer.
4. Detect food collision.
5. Detect wall collision.
6. Detect self collision.
7. Render the current state to the DOM and Canvas.

## Rendering Layout

The browser page is divided into:

- Status area at the top.
- Game area below the status area.

The status area shows player name and score aligned to the right. The snake and food are rendered only inside the game area.

## Build Pipeline

The TypeScript browser app should use repeatable npm scripts:

```text
npm run dev
  Starts the local development server.

npm run typecheck
  Runs TypeScript checks without emitting files.

npm test
  Runs unit tests for pure game rules.

npm run build
  Creates the production browser bundle.

npm run test:e2e
  Runs browser end-to-end regression tests.
```

## Test Strategy

Most rules should be tested without opening a browser:

- Initial game state creation
- Direction changes
- Rejected reverse direction
- Food consumption
- Score increment
- Snake growth
- Wall collision
- Self collision
- Restart behavior

Browser end-to-end tests should verify:

- Start screen is visible.
- Blank names cannot start.
- Valid names enter the game.
- Name and score render correctly.
- Keyboard input moves the snake.
- Game over can be reached.
- Restart resets state.

Manual testing should verify:

- Start screen layout
- Name entry
- Button behavior
- Keyboard controls
- Game over display
- Visual score updates

## Design Decisions

### Use TypeScript, Vite, And Canvas

TypeScript gives the project a useful type-checking step. Vite provides a lightweight browser build pipeline. HTML Canvas is a good fit for grid-based Snake rendering without requiring a large UI framework.

### Keep Rules Independent From UI

The game rules should be callable from tests. This makes regression testing faster and reduces the need for manual testing after every code change.

### Use Calendar Release Versioning

Releases should use the `yy.quarter.minor.patch` format and major, minor, and patch impact classification as defined in `RELEASE.md`.
