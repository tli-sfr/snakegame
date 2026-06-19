import { GameState } from "../game/models";

export type AppElements = {
  root: HTMLElement;
  form: HTMLFormElement;
  nameInput: HTMLInputElement;
  startButton: HTMLButtonElement;
  startError: HTMLElement;
  gameScreen: HTMLElement;
  playerName: HTMLElement;
  score: HTMLElement;
  releaseVersion: HTMLElement;
  canvas: HTMLCanvasElement;
  gameOver: HTMLElement;
  finalScore: HTMLElement;
  restartButton: HTMLButtonElement;
};

export function createAppShell(root: HTMLElement, appVersion: string): AppElements {
  root.innerHTML = `
    <section class="app-shell" aria-label="Snake game">
      <section class="start-screen" data-screen="start">
        <div class="start-copy">
          <p class="eyebrow">AI Native SDLC Practice</p>
          <h1>Snake</h1>
        </div>
        <form class="start-form" data-testid="start-form">
          <label for="player-name">Player name</label>
          <div class="start-row">
            <input id="player-name" name="player-name" data-testid="name-input" autocomplete="off" maxlength="24" />
            <button type="submit" data-testid="start-button">Start</button>
          </div>
          <p class="form-error" data-testid="start-error" role="status"></p>
        </form>
      </section>

      <section class="game-screen hidden" data-screen="game" aria-label="Game panel">
        <header class="status-bar">
          <div class="status-title">Snake</div>
          <div class="status-meta">
            <span data-testid="player-name"></span>
            <span data-testid="score"></span>
          </div>
        </header>
        <div class="board-frame">
          <canvas data-testid="game-canvas" aria-label="Snake board"></canvas>
          <section class="game-over hidden" data-testid="game-over" role="dialog" aria-live="polite">
            <h2>Game Over</h2>
            <p data-testid="final-score"></p>
            <button type="button" data-testid="restart-button">Restart</button>
          </section>
        </div>
        <footer class="release-version" data-testid="release-version">Version ${appVersion}</footer>
      </section>
    </section>
  `;

  const elements: AppElements = {
    root,
    form: mustQuery(root, "form"),
    nameInput: mustQuery(root, "[data-testid='name-input']"),
    startButton: mustQuery(root, "[data-testid='start-button']"),
    startError: mustQuery(root, "[data-testid='start-error']"),
    gameScreen: mustQuery(root, "[data-screen='game']"),
    playerName: mustQuery(root, "[data-testid='player-name']"),
    score: mustQuery(root, "[data-testid='score']"),
    releaseVersion: mustQuery(root, "[data-testid='release-version']"),
    canvas: mustQuery(root, "[data-testid='game-canvas']"),
    gameOver: mustQuery(root, "[data-testid='game-over']"),
    finalScore: mustQuery(root, "[data-testid='final-score']"),
    restartButton: mustQuery(root, "[data-testid='restart-button']"),
  };

  elements.nameInput.focus();
  return elements;
}

export function renderScreens(elements: AppElements, state: GameState): void {
  const startScreen = mustQuery<HTMLElement>(elements.root, "[data-screen='start']");
  const isStart = state.mode === "START";
  const isGameOver = state.mode === "GAME_OVER";

  startScreen.classList.toggle("hidden", !isStart);
  elements.gameScreen.classList.toggle("hidden", isStart);
  elements.gameOver.classList.toggle("hidden", !isGameOver);
  elements.playerName.textContent = state.playerName ? `Player: ${state.playerName}` : "";
  elements.score.textContent = `Score: ${state.score}`;
  elements.finalScore.textContent = `${state.playerName} scored ${state.score}`;
}

export function showStartError(elements: AppElements, message: string): void {
  elements.startError.textContent = message;
}

export function clearStartError(elements: AppElements): void {
  elements.startError.textContent = "";
}

function mustQuery<T extends Element>(root: ParentNode, selector: string): T {
  const element = root.querySelector<T>(selector);

  if (!element) {
    throw new Error(`Missing required element: ${selector}`);
  }

  return element;
}
