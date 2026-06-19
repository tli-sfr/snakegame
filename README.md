# AI Native Snake Game

This repository is a small practice project for AI native development with Codex. The product is a browser-based TypeScript Snake game with a start screen, player name entry, score display, classic snake movement, food growth, wall collision, self collision, and game over handling.

The documentation is intentionally part of the product. Codex should use these files to clarify requirements, plan the design, implement incrementally, build, test, prepare pull requests, and support major, minor, and patch releases.

## Product Goal

Build a simple, playable browser game that demonstrates a complete SDLC loop with a real build process:

1. Clarify requirements in `SPEC.md`.
2. Plan the design in `ARCHITECTURE.md`.
3. Implement according to the guidance in `AGENTS.md`.
4. Build and test using the checklist in `PR_CHECKLIST.md`.
5. Capture learning in `RETROSPECTIVE.md`.
6. Version and release using the `yy.quarter.minor.patch` rules in `RELEASE.md`.

## Game Summary

The game starts on a screen where the player enters a name and clicks a start button. After starting, the game shows the player name and current score in the top-right area of the game panel. The rest of the panel is the play area.

The snake moves continuously. The player controls direction with the keyboard. Eating food increases the score and lengthens the snake. Hitting a wall or the snake's own body ends the game.

## Suggested Tech Stack

- Language: TypeScript
- Runtime: Browser
- Build tool: Vite
- Rendering: HTML Canvas
- Unit test runner: Vitest
- End-to-end test runner: Playwright
- Package manager: npm

## Expected Repository Layout

```text
.
├── README.md
├── SPEC.md
├── ARCHITECTURE.md
├── AGENTS.md
├── PR_CHECKLIST.md
├── RELEASE.md
├── RETROSPECTIVE.md
├── package.json
├── tsconfig.json
├── vite.config.ts
├── index.html
├── src/
│   ├── main.ts
│   ├── game/
│   │   ├── engine.ts
│   │   ├── models.ts
│   │   └── rules.ts
│   ├── ui/
│   │   ├── canvasRenderer.ts
│   │   └── screens.ts
│   └── styles.css
└── tests/
    ├── game-rules.test.ts
    └── e2e/
        └── snake.spec.ts
```

## Local Development

Use the project Node version:

```bash
nvm use
```

Install dependencies:

```bash
npm install
```

Run the app locally:

```bash
npm run dev
```

Run TypeScript checks:

```bash
npm run typecheck
```

Run unit tests:

```bash
npm test
```

Create a production build:

```bash
npm run build
```

Run browser end-to-end regression tests:

```bash
npm run test:e2e
```

## SDLC Definition of Done

A change is done when:

- Requirements are reflected in `SPEC.md` or confirmed unchanged.
- Design impact is reflected in `ARCHITECTURE.md` or confirmed unchanged.
- Implementation is complete and scoped.
- TypeScript type checks pass.
- The production build passes.
- Unit tests pass.
- End-to-end regression passes for user-facing flow changes.
- Manual gameplay regression has been performed.
- PR checklist is complete.
- Release impact is classified as major, minor, patch, or none.
- Next release version is calculated when the change ships.
- Retrospective notes are captured after each meaningful iteration.
