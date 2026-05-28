import { expect, Locator, Page } from "@playwright/test";

export class GaragePage {
  readonly addCarButton: Locator;

  constructor(readonly page: Page) {
    this.addCarButton = this.page.getByRole("button", { name: "Add car" });
  }

  async open(): Promise<void> {
    await this.page.goto("/panel/garage");
  }

  async expectOpened(): Promise<void> {
    await expect(this.page).toHaveURL(/panel\/garage/);
    await expect(this.addCarButton).toBeVisible();
  }
}
