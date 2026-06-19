# Release Guide

This project uses calendar release versioning with release impact classification.

## Version Format

Release versions use this format:

```text
yy.quarter.minor.patch
```

Where:

- `yy` is the last two digits of the release year.
- `quarter` is the calendar quarter number, from `1` to `4`.
- `minor` starts at `0` for the first major baseline in each `yy.quarter` release train.
- `patch` starts at `0` for each `yy.quarter.minor` release line.

Quarter mapping:

```text
Q1: January, February, March
Q2: April, May, June
Q3: July, August, September
Q4: October, November, December
```

Example: a first major release on June 18, 2026 is `26.2.0.0`.

## Important Nuance

This format does not have a separate numeric major field. `yy` and `quarter` are calendar fields, not compatibility fields.

That means major, minor, and patch are release impact classifications:

- Major impact: breaking or significantly behavior-changing release.
- Minor impact: compatible feature release.
- Patch impact: compatible fix release.

For automatic versioning, the first major baseline in a release train is `yy.quarter.0.0`. Patch releases increment only `patch`. Minor releases increment `minor` and reset `patch` to `0`.

If a future project needs the version number itself to encode major compatibility, use a different format such as `major.yy.quarter.minor.patch`.

## Automatic Versioning Rules

Inputs:

- Target release date
- Release impact: `major`, `minor`, `patch`, or `none`
- Latest existing release version for the target release train

Algorithm:

1. Determine the target release train.
   - Normal forward release: use the target release date to compute `yy.quarter`.
   - Maintenance release for an older release line: keep the original `yy.quarter.minor` line being patched.
2. If release impact is `none`, do not create a new release version.
3. If no version exists yet for the target `yy.quarter`, the release must be the major baseline `yy.quarter.0.0`.
4. If no version exists yet and the requested impact is `minor` or `patch`, stop and create or identify the major baseline first.
5. If release impact is `patch`, keep the same `yy.quarter.minor` line and increment `patch` by `1`.
6. If release impact is `minor`, increment `minor` by `1` and reset `patch` to `0`.
7. If release impact is `major` and a version already exists in the same `yy.quarter`, mark the release impact as `Major` and require an explicit decision before versioning because the format has no separate major number.

## Examples

Assume the target release date is June 18, 2026, so the release train is `26.2`.

```text
No previous release in Q2 2026:
  first major release -> 26.2.0.0

Latest release is 26.2.0.0:
  patch release -> 26.2.0.1
  minor release -> 26.2.1.0
  major release -> requires explicit versioning decision because 26.2.0.0 already exists

Latest release is 26.2.0.1:
  patch release -> 26.2.0.2
  minor release -> 26.2.1.0
  major release -> requires explicit versioning decision because 26.2.0.0 already exists

Latest release is 26.2.1.0:
  patch release -> 26.2.1.1
  minor release -> 26.2.2.0
  major release -> requires explicit versioning decision because 26.2.0.0 already exists

First normal release in Q3 2026:
  first Q3 major baseline -> 26.3.0.0
```

## Version Calculation Pseudocode

```ts
type ReleaseImpact = "major" | "minor" | "patch" | "none";

type Version = {
  yy: number;
  quarter: 1 | 2 | 3 | 4;
  minor: number;
  patch: number;
};

function nextVersion(
  releaseTrain: Pick<Version, "yy" | "quarter">,
  latestForTrain: Version | null,
  impact: ReleaseImpact,
): Version | null {
  if (impact === "none") {
    return null;
  }

  if (!latestForTrain && impact === "major") {
    return { ...releaseTrain, minor: 0, patch: 0 };
  }

  if (!latestForTrain) {
    throw new Error(
      "Minor and patch releases require an existing major baseline.",
    );
  }

  if (impact === "patch") {
    return { ...latestForTrain, patch: latestForTrain.patch + 1 };
  }

  if (impact === "major") {
    throw new Error(
      "Major impact after an existing release requires an explicit versioning decision.",
    );
  }

  return {
    yy: releaseTrain.yy,
    quarter: releaseTrain.quarter,
    minor: latestForTrain.minor + 1,
    patch: 0,
  };
}
```

## Version Types

### Major Release

Use a major release when a change significantly alters expected behavior or compatibility.

Examples:

- Replacing the browser Canvas implementation with a different rendering architecture.
- Changing the core game rules in a way players would notice as a different game.
- Changing save data or configuration in an incompatible way after those features exist.
- Changing supported browser targets in a way that drops existing users.

Versioning rule: create `yy.quarter.0.0` when starting a new quarterly release train. If a major-impact change is needed after that baseline already exists, mark release impact as `Major` and require an explicit versioning decision because this format has no separate major number.

### Minor Release

Use a minor release when adding compatible new functionality.

Examples:

- Adding difficulty selection.
- Adding sound effects.
- Adding a local high score table.
- Adding pause and resume.
- Adding visual themes.
- Adding installable Progressive Web App support.

Versioning rule: increment `minor` and reset `patch` to `0`.

### Patch Release

Use a patch release for compatible fixes and small improvements.

Examples:

- Fixing self-collision detection.
- Fixing score display alignment.
- Fixing food spawning on the snake.
- Fixing a crash on restart.
- Fixing a TypeScript build error.
- Fixing a browser compatibility issue.
- Improving tests without changing behavior.

Versioning rule: keep `minor` and increment `patch`.

### No Release Impact

Use no release impact for changes that do not affect shipped behavior.

Examples:

- Documentation-only edits.
- Comment cleanup.
- Internal refactoring with no behavior change.
- Test-only changes that do not alter product behavior.
- Build script cleanup with no behavior change.

Versioning rule: do not create a release version.

## Release Checklist

- [ ] Release impact is classified as major, minor, patch, or none.
- [ ] Target release date is known.
- [ ] Target `yy.quarter` release train is calculated.
- [ ] Previous latest version for the release train is identified.
- [ ] Next version is calculated using this guide.
- [ ] TypeScript checks pass.
- [ ] Unit tests pass.
- [ ] Production build passes.
- [ ] Browser end-to-end regression passes.
- [ ] End-to-end manual regression passes.
- [ ] `README.md` is accurate.
- [ ] `SPEC.md` reflects shipped behavior.
- [ ] `ARCHITECTURE.md` reflects current structure.
- [ ] PR release impact is classified.
- [ ] Retrospective notes are captured.

## Release Note Template

```md
## Version yy.quarter.minor.patch

Release date:
Release impact: Major | Minor | Patch

### Added

- 

### Changed

- 

### Fixed

- 

### Build And Testing

- 
```
