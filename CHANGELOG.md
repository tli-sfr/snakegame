# Changelog

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
