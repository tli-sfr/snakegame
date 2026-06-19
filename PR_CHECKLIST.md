# Pull Request Checklist

Use this checklist before opening or merging a PR.

## Requirement Coverage

- [ ] The change maps to a requirement in `SPEC.md`.
- [ ] New behavior has acceptance criteria.
- [ ] Out-of-scope behavior was not added accidentally.

## Design Coverage

- [ ] Architecture impact was reviewed.
- [ ] `ARCHITECTURE.md` was updated if structure changed.
- [ ] Game rules remain testable outside the UI.
- [ ] UI code remains separate from core game logic.
- [ ] Browser event handling remains separate from core game rules.

## Implementation Review

- [ ] Code is scoped to the requested change.
- [ ] Names are clear.
- [ ] No unrelated refactors are included.
- [ ] No dead code or temporary debug output remains.

## Build Verification

- [ ] Dependencies install cleanly with `npm install`.
- [ ] TypeScript checks pass with `npm run typecheck`.
- [ ] Production build passes with `npm run build`.
- [ ] Build output is not committed unless the project explicitly requires it.

## Automated Testing

- [ ] Unit tests were added or updated for changed game rules.
- [ ] `npm test` passes.
- [ ] Browser end-to-end tests pass with `npm run test:e2e` when user-facing behavior changes.
- [ ] Collision behavior is covered.
- [ ] Scoring behavior is covered.
- [ ] Restart behavior is covered when touched.

## Manual Regression Testing

- [ ] App opens to the start screen in a browser.
- [ ] Blank name cannot start the game.
- [ ] Valid name starts the game.
- [ ] Player name appears on the game screen.
- [ ] Score appears on the game screen.
- [ ] Snake moves with keyboard controls.
- [ ] Snake eats food and grows.
- [ ] Score increases after eating food.
- [ ] Wall collision triggers game over.
- [ ] Self collision triggers game over.
- [ ] Restart creates a fresh game state.

## End-To-End Regression

Perform this full path before merge:

1. Install dependencies.
2. Run TypeScript checks.
3. Run unit tests.
4. Create a production build.
5. Launch the app in a browser.
6. Enter a player name.
7. Start the game.
8. Move the snake to eat at least one food item.
9. Confirm score increased.
10. Confirm snake length increased.
11. Trigger wall collision.
12. Confirm game over screen appears.
13. Restart the game.
14. Confirm score resets to 0.

## PR Description Template

```md
## Summary

Describe the user-visible change in 1-3 bullets.

## Requirement

Link or quote the relevant `SPEC.md` section.

## Implementation Notes

Describe the main code changes.

## Build And Tests

List type-check, build, automated, browser, and manual tests performed.

## Release Impact

Major, minor, patch, or none. Explain why.

## Versioning

- Target release date:
- Previous version:
- Next version:
- Versioning rule used:

## Retrospective Notes

Mention anything that should be added to `RETROSPECTIVE.md`.
```
