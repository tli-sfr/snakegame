# Retrospective

Use this file after each meaningful development iteration. The goal is to improve the AI native development process, not just record what happened.

## Iteration Template

```md
## Iteration N: Short Title

Date:

### Goal

What were we trying to accomplish?

### What Changed

- 

### What Worked

- 

### What Was Confusing

- 

### Bugs Or Risks Found

- 

### Testing Performed

- [ ] TypeScript type check
- [ ] Unit tests
- [ ] Production build
- [ ] Browser end-to-end tests
- [ ] Manual start screen test
- [ ] Manual gameplay test
- [ ] Manual game over test
- [ ] End-to-end regression

### Release Impact

Major, minor, patch, or none.

### Follow-Up Actions

- 
```

## Iteration 0: Documentation Scaffold

Date: 2026-06-18

### Goal

Prepare the initial documentation set for an AI native Snake game development workflow.

### What Changed

- Created the core SDLC documentation plan.
- Defined the relationship between requirements, architecture, implementation, build verification, testing, PR review, release management, and retrospectives.
- Shifted the implementation target to a TypeScript browser game so the SDLC includes a real build pipeline.

### What Worked

- The small Snake game scope makes the complete SDLC loop easy to practice.
- Separating game rules from UI gives the project a clear testing path.
- Moving to TypeScript in the browser gives the project realistic type-check, build, and end-to-end regression gates.

### What Was Confusing

- Release flexibility needs explicit examples so major, minor, and patch decisions are consistent.
- Browser support should be clarified before the first production-style release.

### Bugs Or Risks Found

- No code exists yet, so there is no runtime behavior to validate.

### Testing Performed

- [ ] TypeScript type check
- [ ] Unit tests
- [ ] Production build
- [ ] Browser end-to-end tests
- [ ] Manual start screen test
- [ ] Manual gameplay test
- [ ] Manual game over test
- [ ] End-to-end regression

### Release Impact

None. Documentation scaffold only.

### Follow-Up Actions

- Create the TypeScript browser project skeleton.
- Implement pure game rules first.
- Add unit tests before wiring the full Canvas UI.
- Add a production build and browser end-to-end regression script.

## Iteration 1: First Major Baseline

Date: 2026-06-18

### Goal

Build the first experimental major baseline release of the TypeScript browser Snake game.

### What Changed

- Created the Vite, TypeScript, Vitest, and Playwright project structure.
- Implemented the start screen, player name validation, Canvas game board, score display, game over state, and restart flow.
- Implemented pure game rules for movement, food, score, growth, wall collision, self collision, and restart.
- Added `package.json` version `26.2.0.0` and initial `CHANGELOG.md` release notes.
- Resolved version 1 gameplay assumptions in `SPEC.md`.

### What Worked

- Keeping game rules separate from rendering made unit tests straightforward.
- The browser E2E test proved the main start-to-game-over flow against the production preview build.
- The `yy.quarter.minor.patch` release rule mapped cleanly to the first major baseline version `26.2.0.0`.

### What Was Confusing

- The local Node runtime is `v16.17.1`, so dependency versions had to be pinned exactly to avoid drifting into Node 18-only package versions.
- The internal npm registry was slow enough that verbose install output was needed to distinguish progress from a hang.
- Playwright's managed Chromium browser was not installed, so the E2E config uses the local Google Chrome channel.

### Bugs Or Risks Found

- The first Vitest run accidentally collected the Playwright E2E spec; `vitest.config.ts` now scopes unit tests to `*.test.ts`.
- Browser automation through the in-app browser was unavailable in this session, so manual visual verification used Playwright screenshots instead.
- The E2E-only debug hook is exposed only when the URL includes `?e2e=1`; this should remain test-only.

### Testing Performed

- [x] TypeScript type check
- [x] Unit tests
- [x] Production build
- [x] Browser end-to-end tests
- [x] Manual start screen test
- [x] Manual gameplay test
- [x] Manual game over test
- [x] End-to-end regression

### Release Impact

Major. First baseline release version: `26.2.0.0`.

### Follow-Up Actions

- Consider installing a managed Playwright browser or standardizing on a Node 18+ runtime.
- Consider adding a pause control in a future minor release.
- Consider adding local high score persistence in a future minor release.

## Iteration 2: Release Version Display

Date: 2026-06-19

### Goal

Prepare a minor release that shows the release version number at the bottom of the game screen and leaves clear CI/CD evidence through the PR and release branch flow.

### What Changed

- Added a build-time app version constant from `package.json`.
- Rendered `Version 26.2.1.0` below the game board.
- Added E2E coverage for the visible version text.
- Added `main` push and manual dispatch triggers to the PR CI workflow.

### What Worked

- The existing screen shell made it straightforward to add a small footer without touching game rules.
- The E2E test is the right level for proving the player-visible version number.

### What Was Confusing

- npm rejects the four-part calendar version in `npm version`, so version metadata was updated directly to match the project's documented release format.

### Bugs Or Risks Found

- Release evidence depends on opening and merging the GitHub PR after the release branch is pushed.

### Testing Performed

- [x] TypeScript type check
- [x] Unit tests
- [x] Production build
- [x] Browser end-to-end tests
- [ ] Manual start screen test
- [ ] Manual gameplay test
- [ ] Manual game over test
- [x] End-to-end regression

### Release Impact

Minor. Next release version: `26.2.1.0`.

### Follow-Up Actions

- Open the release PR from `release/26.2.1.0` to `main`.
- Confirm `Release Regression`, PR CI, and post-merge `main` CI runs in GitHub Actions.
