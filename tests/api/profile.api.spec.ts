import { test, expect } from "@playwright/test";

test("UI should display fake profile", async ({ page }) => {
  await page.route("**/api/users/profile", async (route) => {
    const response = await route.fetch();
    const json = await response.json();

    json.data.name = "Anna";
    json.data.lastName = "Mocked";

    await route.fulfill({
      response,
      json,
    });
  });

  await page.goto("/panel/profile");

  await expect(page.getByText("Anna Mocked")).toBeVisible();
  await page.pause();
});