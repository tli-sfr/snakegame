import { DEFAULT_CONFIG, Direction, GameConfig, GameState, Position } from "./models";
import {
  advanceGame,
  createInitialGameState,
  createStartState,
  FoodGenerator,
  requestDirection,
  restartGame,
} from "./rules";

export class GameEngine {
  private state: GameState;

  private readonly config: GameConfig;

  private foodGenerator?: FoodGenerator;

  constructor(config: GameConfig = DEFAULT_CONFIG) {
    this.config = config;
    this.state = createStartState(config);
  }

  getState(): GameState {
    return structuredClone(this.state);
  }

  getConfig(): GameConfig {
    return { ...this.config };
  }

  start(playerName: string): boolean {
    const trimmedName = playerName.trim();

    if (!trimmedName) {
      return false;
    }

    this.state = createInitialGameState(trimmedName, this.config);
    return true;
  }

  restart(): void {
    if (!this.state.playerName) {
      this.state = createStartState(this.config);
      return;
    }

    this.state = restartGame(this.state, this.config);
  }

  requestDirection(direction: Direction): void {
    this.state = requestDirection(this.state, direction);
  }

  tick(): void {
    this.state = advanceGame(this.state, this.config, this.foodGenerator);
  }

  setFoodForTesting(food: Position): void {
    if (import.meta.env.PROD) {
      return;
    }

    this.state = {
      ...this.state,
      food,
    };
  }

  setFoodGeneratorForTesting(foodGenerator: FoodGenerator): void {
    if (import.meta.env.PROD) {
      return;
    }

    this.foodGenerator = foodGenerator;
  }
}
