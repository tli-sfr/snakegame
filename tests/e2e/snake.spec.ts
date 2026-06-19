import { expect, test } from "@playwright/test";

test("plays the main Snake flow through score, game over, and restart", async ({ page }) => {
  await page.goto("/?e2e=1");

  await expect(page.getByTestId("name-input")).toBeVisible();
  await page.getByTestId("start-button").click();
  await expect(page.getByTestId("start-error")).toHaveText("Enter a player name to start.");

  await page.getByTestId("name-input").fill("Ada");
  await page.getByTestId("start-button").click();

  await expect(page.getByTestId("player-name")).toHaveText("Player: Ada");
  await expect(page.getByTestId("score")).toHaveText("Score: 0");
  await expect(page.getByTestId("game-canvas")).toBeVisible();

  await page.evaluate(() => {
    const state = window.__snakeDebug?.getState();
    const head = state?.snake[0];
    if (!head) {
      throw new Error("Snake debug state is unavailable.");
    }

    window.__snakeDebug?.setFood(head.x + 1, head.y);
    window.__snakeDebug?.tick();
  });

  await expect(page.getByTestId("score")).toHaveText("Score: 1");

  const lengthAfterFood = await page.evaluate(() => window.__snakeDebug?.getState().snake.length);
  expect(lengthAfterFood).toBe(4);

  await page.evaluate(() => {
    for (let index = 0; index < 20; index += 1) {
      window.__snakeDebug?.tick();
    }
  });

  await expect(page.getByTestId("game-over")).toBeVisible();
  await expect(page.getByTestId("final-score")).toHaveText("Ada scored 1");

  await page.getByTestId("restart-button").click();

  await expect(page.getByTestId("score")).toHaveText("Score: 0");
  await expect(page.getByTestId("game-over")).toBeHidden();
});
