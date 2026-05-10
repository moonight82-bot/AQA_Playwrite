import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");

  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill("standard_user");

  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill("secret_sauce");

  await page.locator('[data-test="login-button"]').click();

  await page.getByText("Swag Labs").click();
});

test("test2", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");

  const inputName = page.locator('[data-test="username"]');
  const inputPassword = page.locator('[data-test="password"]');
  const inputButton = page.locator('[data-test="login-button"]');

  await inputName.fill("standard_user");
  await inputPassword.fill("secret_sauce");
  await inputButton.click();
});

test("test3", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");

  await page.getByPlaceholder("Username").fill("standard_user");

  await page.getByPlaceholder("Password").fill("secret_sauce");

  await page.getByRole("button", { name: "Login" }).click();

  await page.getByRole("button", { name: "Open Menu" }).click();
  await page.getByRole("link", { name: "About" }).click();
});

test("test4", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");

  const inputName = page.locator('[data-test="username"]');
  const inputPassword = page.locator('[data-test="password"]');
  const inputButton = page.locator('[data-test="login-button"]');

  await inputName.fill("standard_user");
  await inputPassword.fill("secret_sauce");
  await inputButton.click();

  await expect(page.getByText("Sauce")).toBeVisible();
  await expect(
    page.getByText("Sauce Labs Backpack", { exact: true }),
  ).toBeVisible();
});

test("test5", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");

  const inputName = page.locator('[data-test="username"]');
  const inputPassword = page.locator('[data-test="password"]');
  const inputButton = page.locator('[data-test="login-button"]');

  await inputName.fill("standard_user");
  await inputPassword.fill("secret_sauce");
  await inputButton.click();

  const inventoryForm = page.locator(".inventory_item");

  const invent = inventoryForm.filter({hasText: "Sauce Labs Backpack",});

  await invent.getByRole("button", {name: "Add to cart",}).click();

});
