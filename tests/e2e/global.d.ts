import type { GameState } from "../../src/game/models";

declare global {
  interface Window {
    __snakeDebug?: {
      tick: () => void;
      setFood: (x: number, y: number) => void;
      getState: () => GameState;
    };
  }
}

export {};
