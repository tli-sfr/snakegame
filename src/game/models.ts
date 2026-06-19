export type GameMode = "START" | "RUNNING" | "GAME_OVER";

export type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

export type Position = {
  x: number;
  y: number;
};

export type GameConfig = {
  gridWidth: number;
  gridHeight: number;
  tickMs: number;
  scorePerFood: number;
};

export type GameState = {
  mode: GameMode;
  playerName: string;
  score: number;
  snake: Position[];
  direction: Direction;
  pendingDirection: Direction;
  food: Position;
  gridWidth: number;
  gridHeight: number;
};

export const DEFAULT_CONFIG: GameConfig = {
  gridWidth: 24,
  gridHeight: 18,
  tickMs: 140,
  scorePerFood: 1,
};

export const INITIAL_DIRECTION: Direction = "RIGHT";

export const INITIAL_SNAKE: Position[] = [
  { x: 10, y: 9 },
  { x: 9, y: 9 },
  { x: 8, y: 9 },
];

export const INITIAL_FOOD: Position = { x: 14, y: 9 };
