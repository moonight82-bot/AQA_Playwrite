import { expect, Page } from "@playwright/test";

export class GaragePage {
  constructor(private readonly page: Page) {}

  async expectOpened(): Promise<void> {
    await expect(this.page).toHaveURL(/garage/);
    await expect(
      this.page.getByRole("heading", { name: "Garage" }),
    ).toBeVisible();
  }
}
