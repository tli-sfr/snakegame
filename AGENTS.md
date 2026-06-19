# Codex Agent Guide

This file is the working guide for Codex and other AI coding agents. Follow it before editing code.

## Project Mission

Build a small but complete browser-based TypeScript Snake game while practicing an AI native SDLC process. The process matters as much as the game.

## Operating Principles

- Read `README.md`, `SPEC.md`, and `ARCHITECTURE.md` before implementation.
- Treat `SPEC.md` as the source of product truth.
- Treat `ARCHITECTURE.md` as the source of design intent.
- Keep changes small, reviewable, and tied to acceptance criteria.
- Prefer explicit, testable game logic over UI-only behavior.
- Do not silently change requirements; update the docs when product behavior changes.

## SDLC Workflow

### 1. Requirement Clarification

Before coding:

- Identify the requirement being implemented.
- Check whether `SPEC.md` already covers it.
- If behavior is ambiguous, make a reasonable assumption for small low-risk details and record it in `SPEC.md`.
- Ask the user only when the decision changes product behavior or release scope.

### 2. Planning And Design

Before structural edits:

- Check `ARCHITECTURE.md`.
- Keep game rules separate from DOM and Canvas rendering.
- Prefer adding functions or methods that can be unit tested.
- Avoid broad refactors unless needed for the current acceptance criteria.

### 3. Implementation

During coding:

- Use TypeScript with explicit domain types for game state, direction, positions, and modes.
- Keep modules focused.
- Use descriptive names for game states, directions, and positions.
- Keep rendering code thin.
- Keep collision and scoring logic in the game layer.
- Keep browser event handling in the UI or app entry layer.
- Add comments only for non-obvious logic.

### 4. Build Process

When adding or changing implementation code:

- Keep `package.json` scripts accurate.
- Ensure TypeScript type checks are part of the verification flow.
- Ensure production builds succeed before PR completion.
- Keep build configuration small and understandable.
- Do not add a large framework unless the requirement clearly needs it.

### 5. Testing

Before finishing:

- Run unit tests with `npm test`.
- Run type checks with `npm run typecheck` when available.
- Run the production build with `npm run build`.
- Run browser end-to-end tests with `npm run test:e2e` when user-facing flow changes.
- Manually run the game when UI behavior changes.
- Exercise start, gameplay, food collision, wall collision, self collision, and restart.
- Update or add tests for every changed rule.

### 6. Pull Request

Before preparing a PR:

- Complete `PR_CHECKLIST.md`.
- Confirm the change is scoped.
- Mention build results.
- Mention automated test results.
- Mention browser end-to-end regression results when applicable.
- Mention manual regression results.
- Mention release impact: major, minor, patch, or none.

### 7. Release

When release behavior changes:

- Follow `RELEASE.md`.
- Classify the change as major, minor, patch, or none.
- Calculate the next version using the `yy.quarter.minor.patch` rules in `RELEASE.md`.
- Use `yy.quarter.0.0` for the first major baseline in a release train.
- Use `yy.quarter.0.1` for an immediate patch after that baseline.
- Use `yy.quarter.1.0` for the next regular minor release after that baseline.
- Remember that major impact is a classification in this project, not a separate numeric version field.
- Update release notes or changelog material.

### 8. Retrospective

After each meaningful iteration:

- Update `RETROSPECTIVE.md`.
- Capture what worked, what was confusing, what tests caught, and what should change next time.

## Definition Of Done

A task is done only when:

- Code implements the accepted requirement.
- TypeScript type checks pass.
- Production build passes.
- Unit tests pass.
- Browser end-to-end regression passes when relevant.
- Relevant manual regression has been performed.
- Documentation is updated or intentionally unchanged.
- PR notes can explain what changed and why.
- Release impact is classified.
- Next release version is calculated when the change ships.

## Suggested Commands

```bash
npm install
npm run dev
npm run typecheck
npm test
npm run build
npm run test:e2e
```

## PR Summary Template

```md
## Summary

- 

## Tests

- [ ] `npm run typecheck`
- [ ] `npm test`
- [ ] `npm run build`
- [ ] `npm run test:e2e`
- [ ] Manual start screen test
- [ ] Manual gameplay test
- [ ] Manual game over test

## Release Impact

- [ ] Major
- [ ] Minor
- [ ] Patch
- [ ] None

## Version

- Target release date:
- Previous version:
- Next version:
```
