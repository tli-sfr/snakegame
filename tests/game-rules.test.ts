import { describe, expect, it } from "vitest";
import { DEFAULT_CONFIG } from "../src/game/models";
import {
  advanceGame,
  createInitialGameState,
  directionFromKey,
  requestDirection,
  restartGame,
} from "../src/game/rules";

describe("game rules", () => {
  it("creates a predictable initial running state", () => {
    const state = createInitialGameState("Ada");

    expect(state.mode).toBe("RUNNING");
    expect(state.playerName).toBe("Ada");
    expect(state.score).toBe(0);
    expect(state.snake).toEqual([
      { x: 10, y: 9 },
      { x: 9, y: 9 },
      { x: 8, y: 9 },
    ]);
    expect(state.food).toEqual({ x: 14, y: 9 });
  });

  it("rejects direct reverse direction changes", () => {
    const state = createInitialGameState("Grace");
    const reversed = requestDirection(state, "LEFT");

    expect(reversed.pendingDirection).toBe("RIGHT");
  });

  it("accepts legal direction changes", () => {
    const state = createInitialGameState("Grace");
    const changed = requestDirection(state, "UP");

    expect(changed.pendingDirection).toBe("UP");
  });

  it("maps arrow keys and WASD keys to directions", () => {
    expect(directionFromKey("ArrowUp")).toBe("UP");
    expect(directionFromKey("s")).toBe("DOWN");
    expect(directionFromKey("A")).toBe("LEFT");
    expect(directionFromKey("ArrowRight")).toBe("RIGHT");
    expect(directionFromKey("Escape")).toBeNull();
  });

  it("moves without growing when food is not eaten", () => {
    const state = createInitialGameState("Lin");
    const advanced = advanceGame(state);

    expect(advanced.snake).toHaveLength(3);
    expect(advanced.snake[0]).toEqual({ x: 11, y: 9 });
    expect(advanced.score).toBe(0);
  });

  it("increases score and length after eating food", () => {
    const state = {
      ...createInitialGameState("Lin"),
      food: { x: 11, y: 9 },
    };
    const advanced = advanceGame(state, DEFAULT_CONFIG, () => ({ x: 3, y: 3 }));

    expect(advanced.score).toBe(1);
    expect(advanced.snake).toHaveLength(4);
    expect(advanced.food).toEqual({ x: 3, y: 3 });
  });

  it("ends the game on wall collision", () => {
    const state = {
      ...createInitialGameState("Katherine"),
      snake: [
        { x: 23, y: 9 },
        { x: 22, y: 9 },
        { x: 21, y: 9 },
      ],
    };

    expect(advanceGame(state).mode).toBe("GAME_OVER");
  });

  it("ends the game on self collision", () => {
    const state = {
      ...createInitialGameState("Margaret"),
      direction: "UP" as const,
      pendingDirection: "UP" as const,
      snake: [
        { x: 5, y: 5 },
        { x: 5, y: 4 },
        { x: 4, y: 4 },
        { x: 4, y: 5 },
        { x: 5, y: 5 },
      ],
      food: { x: 20, y: 15 },
    };

    const changed = requestDirection(state, "LEFT");
    const advanced = advanceGame(changed);

    expect(advanced.mode).toBe("GAME_OVER");
  });

  it("restarts with the same player name and a fresh score", () => {
    const state = {
      ...createInitialGameState("Hedy"),
      mode: "GAME_OVER" as const,
      score: 4,
    };

    const restarted = restartGame(state);

    expect(restarted.mode).toBe("RUNNING");
    expect(restarted.playerName).toBe("Hedy");
    expect(restarted.score).toBe(0);
  });
});
