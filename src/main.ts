import "./styles.css";
import { APP_VERSION } from "./appVersion";
import { DEFAULT_CONFIG } from "./game/models";
import { GameEngine } from "./game/engine";
import { directionFromKey } from "./game/rules";
import { CanvasRenderer } from "./ui/canvasRenderer";
import {
  clearStartError,
  createAppShell,
  renderScreens,
  showStartError,
} from "./ui/screens";

declare global {
  interface Window {
    __snakeDebug?: {
      tick: () => void;
      setFood: (x: number, y: number) => void;
      getState: () => ReturnType<GameEngine["getState"]>;
    };
  }
}

const root = document.querySelector<HTMLElement>("#app");

if (!root) {
  throw new Error("App root not found.");
}

const engine = new GameEngine(DEFAULT_CONFIG);
const elements = createAppShell(root, APP_VERSION);
const renderer = new CanvasRenderer(elements.canvas);
let tickTimer: number | undefined;

function render(): void {
  const state = engine.getState();
  renderScreens(elements, state);

  if (state.mode !== "START") {
    renderer.render(state);
  }

  if (state.mode === "GAME_OVER" && tickTimer !== undefined) {
    window.clearInterval(tickTimer);
    tickTimer = undefined;
  }
}

function startTicking(): void {
  if (tickTimer !== undefined) {
    window.clearInterval(tickTimer);
  }

  tickTimer = window.setInterval(() => {
    engine.tick();
    render();
  }, DEFAULT_CONFIG.tickMs);
}

elements.form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!engine.start(elements.nameInput.value)) {
    showStartError(elements, "Enter a player name to start.");
    return;
  }

  clearStartError(elements);
  startTicking();
  render();
});

elements.nameInput.addEventListener("input", () => {
  if (elements.nameInput.value.trim()) {
    clearStartError(elements);
  }
});

elements.restartButton.addEventListener("click", () => {
  engine.restart();
  startTicking();
  render();
});

window.addEventListener("keydown", (event) => {
  const direction = directionFromKey(event.key);

  if (!direction) {
    return;
  }

  event.preventDefault();
  engine.requestDirection(direction);
  render();
});

if (!import.meta.env.PROD || window.location.search.includes("e2e=1")) {
  window.__snakeDebug = {
    tick: () => {
      engine.tick();
      render();
    },
    setFood: (x: number, y: number) => {
      engine.setFoodForTesting({ x, y });
      render();
    },
    getState: () => engine.getState(),
  };
}

render();
