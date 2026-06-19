# Changelog

## Version 26.2.1.0

Release date: 2026-06-19
Release impact: Minor

### Added

- Displayed the release version number at the bottom of the game screen.
- Added browser regression coverage for the visible release version.
- Added CI triggers for `main` pushes and manual workflow dispatch so release evidence is visible after merge.

### Build And Testing

- Release gate commands: `npm run typecheck`, `npm test`, `npm run build`, and `npm run test:e2e`.

## Version 26.2.0.0

Release date: 2026-06-18
Release impact: Major

### Added

- Initial TypeScript browser Snake game.
- Start screen with player name entry and start validation.
- Canvas-based game board with snake, food, score, and player name.
- Classic Snake rules for movement, growth, scoring, wall collision, self collision, game over, and restart.
- Vite build process, TypeScript type checking, Vitest unit tests, and Playwright browser E2E tests.

### Build And Testing

- Release gate commands: `npm run typecheck`, `npm test`, `npm run build`, and `npm run test:e2e`.
