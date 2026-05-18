import { expect, Page } from "@playwright/test";
import { RegistrationModal } from "../components/RegistrationModal";

export class HomePage {
  readonly registrationModal: RegistrationModal;

  constructor(private readonly page: Page) {
    this.registrationModal = new RegistrationModal(page);
  }

  async open(): Promise<void> {
    await this.page.goto("https://guest:welcome2qauto@qauto.forstudy.space/");
  }

  async openRegistrationModal(): Promise<void> {
    await this.page.getByRole("button", { name: "Sign up" }).click();
    await expect(this.registrationModal.dialog).toBeVisible();
  }
}
