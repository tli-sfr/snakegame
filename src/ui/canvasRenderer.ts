import { GameState } from "../game/models";

const CELL_SIZE = 24;
const GRID_LINE_COLOR = "rgba(10, 18, 32, 0.08)";
const BOARD_COLOR = "#f7faf7";
const SNAKE_HEAD_COLOR = "#256d4c";
const SNAKE_BODY_COLOR = "#34a36f";
const FOOD_COLOR = "#d94b3d";

export class CanvasRenderer {
  private readonly context: CanvasRenderingContext2D;

  constructor(private readonly canvas: HTMLCanvasElement) {
    const context = canvas.getContext("2d");

    if (!context) {
      throw new Error("Canvas rendering context is unavailable.");
    }

    this.context = context;
  }

  resize(state: GameState): void {
    this.canvas.width = state.gridWidth * CELL_SIZE;
    this.canvas.height = state.gridHeight * CELL_SIZE;
  }

  render(state: GameState): void {
    this.resize(state);
    this.clear();
    this.drawGrid(state);
    this.drawFood(state);
    this.drawSnake(state);
  }

  private clear(): void {
    this.context.fillStyle = BOARD_COLOR;
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private drawGrid(state: GameState): void {
    this.context.strokeStyle = GRID_LINE_COLOR;
    this.context.lineWidth = 1;

    for (let x = 0; x <= state.gridWidth; x += 1) {
      this.context.beginPath();
      this.context.moveTo(x * CELL_SIZE, 0);
      this.context.lineTo(x * CELL_SIZE, this.canvas.height);
      this.context.stroke();
    }

    for (let y = 0; y <= state.gridHeight; y += 1) {
      this.context.beginPath();
      this.context.moveTo(0, y * CELL_SIZE);
      this.context.lineTo(this.canvas.width, y * CELL_SIZE);
      this.context.stroke();
    }
  }

  private drawFood(state: GameState): void {
    const padding = 5;
    this.context.fillStyle = FOOD_COLOR;
    this.context.beginPath();
    this.context.roundRect(
      state.food.x * CELL_SIZE + padding,
      state.food.y * CELL_SIZE + padding,
      CELL_SIZE - padding * 2,
      CELL_SIZE - padding * 2,
      6,
    );
    this.context.fill();
  }

  private drawSnake(state: GameState): void {
    state.snake.forEach((segment, index) => {
      const padding = index === 0 ? 3 : 4;
      this.context.fillStyle = index === 0 ? SNAKE_HEAD_COLOR : SNAKE_BODY_COLOR;
      this.context.beginPath();
      this.context.roundRect(
        segment.x * CELL_SIZE + padding,
        segment.y * CELL_SIZE + padding,
        CELL_SIZE - padding * 2,
        CELL_SIZE - padding * 2,
        7,
      );
      this.context.fill();
    });
  }
}
