import {
  DEFAULT_CONFIG,
  Direction,
  GameConfig,
  GameState,
  INITIAL_DIRECTION,
  INITIAL_FOOD,
  INITIAL_SNAKE,
  Position,
} from "./models";

export type FoodGenerator = (
  occupied: Position[],
  gridWidth: number,
  gridHeight: number,
) => Position;

export function createStartState(config: GameConfig = DEFAULT_CONFIG): GameState {
  return {
    mode: "START",
    playerName: "",
    score: 0,
    snake: INITIAL_SNAKE.map(clonePosition),
    direction: INITIAL_DIRECTION,
    pendingDirection: INITIAL_DIRECTION,
    food: { ...INITIAL_FOOD },
    gridWidth: config.gridWidth,
    gridHeight: config.gridHeight,
  };
}

export function createInitialGameState(
  playerName: string,
  config: GameConfig = DEFAULT_CONFIG,
): GameState {
  const trimmedName = playerName.trim();

  return {
    mode: "RUNNING",
    playerName: trimmedName,
    score: 0,
    snake: INITIAL_SNAKE.map(clonePosition),
    direction: INITIAL_DIRECTION,
    pendingDirection: INITIAL_DIRECTION,
    food: { ...INITIAL_FOOD },
    gridWidth: config.gridWidth,
    gridHeight: config.gridHeight,
  };
}

export function restartGame(state: GameState, config: GameConfig = DEFAULT_CONFIG): GameState {
  return createInitialGameState(state.playerName, config);
}

export function requestDirection(state: GameState, nextDirection: Direction): GameState {
  if (state.mode !== "RUNNING") {
    return state;
  }

  if (isOppositeDirection(state.direction, nextDirection)) {
    return state;
  }

  return {
    ...state,
    pendingDirection: nextDirection,
  };
}

export function advanceGame(
  state: GameState,
  config: GameConfig = DEFAULT_CONFIG,
  generateFood: FoodGenerator = randomFood,
): GameState {
  if (state.mode !== "RUNNING") {
    return state;
  }

  const direction = state.pendingDirection;
  const head = movePosition(state.snake[0], direction);
  const willEat = samePosition(head, state.food);
  const bodyToCheck = willEat ? state.snake : state.snake.slice(0, -1);

  if (
    isWallCollision(head, state.gridWidth, state.gridHeight) ||
    isSelfCollision(head, bodyToCheck)
  ) {
    return {
      ...state,
      mode: "GAME_OVER",
      direction,
      pendingDirection: direction,
    };
  }

  const snake = [head, ...state.snake.map(clonePosition)];

  if (!willEat) {
    snake.pop();
  }

  return {
    ...state,
    score: willEat ? state.score + config.scorePerFood : state.score,
    snake,
    direction,
    pendingDirection: direction,
    food: willEat ? generateFood(snake, state.gridWidth, state.gridHeight) : state.food,
  };
}

export function directionFromKey(key: string): Direction | null {
  const normalized = key.toLowerCase();

  if (normalized === "arrowup" || normalized === "w") return "UP";
  if (normalized === "arrowdown" || normalized === "s") return "DOWN";
  if (normalized === "arrowleft" || normalized === "a") return "LEFT";
  if (normalized === "arrowright" || normalized === "d") return "RIGHT";

  return null;
}

export function movePosition(position: Position, direction: Direction): Position {
  switch (direction) {
    case "UP":
      return { x: position.x, y: position.y - 1 };
    case "DOWN":
      return { x: position.x, y: position.y + 1 };
    case "LEFT":
      return { x: position.x - 1, y: position.y };
    case "RIGHT":
      return { x: position.x + 1, y: position.y };
  }
}

export function isWallCollision(
  position: Position,
  gridWidth: number,
  gridHeight: number,
): boolean {
  return (
    position.x < 0 ||
    position.y < 0 ||
    position.x >= gridWidth ||
    position.y >= gridHeight
  );
}

export function isSelfCollision(position: Position, snake: Position[]): boolean {
  return snake.some((segment) => samePosition(position, segment));
}

export function samePosition(left: Position, right: Position): boolean {
  return left.x === right.x && left.y === right.y;
}

export function isOppositeDirection(current: Direction, next: Direction): boolean {
  return (
    (current === "UP" && next === "DOWN") ||
    (current === "DOWN" && next === "UP") ||
    (current === "LEFT" && next === "RIGHT") ||
    (current === "RIGHT" && next === "LEFT")
  );
}

export function randomFood(
  occupied: Position[],
  gridWidth: number,
  gridHeight: number,
): Position {
  const available: Position[] = [];

  for (let y = 0; y < gridHeight; y += 1) {
    for (let x = 0; x < gridWidth; x += 1) {
      const candidate = { x, y };
      if (!isSelfCollision(candidate, occupied)) {
        available.push(candidate);
      }
    }
  }

  if (available.length === 0) {
    return { ...occupied[0] };
  }

  return available[Math.floor(Math.random() * available.length)];
}

function clonePosition(position: Position): Position {
  return { x: position.x, y: position.y };
}
