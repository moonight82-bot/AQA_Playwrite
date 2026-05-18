import { expect, Locator, Page } from "@playwright/test";
import { RegistrationData } from "../utils/registrationTestData";

export class RegistrationModal {
  readonly dialog: Locator;
  readonly nameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly repeatPasswordInput: Locator;
  readonly registerButton: Locator;

  readonly errors: {
    nameRequired: Locator;
    lastNameRequired: Locator;
    emailRequired: Locator;
    emailIncorrect: Locator;
    passwordRequired: Locator;
    repeatPasswordRequired: Locator;
    nameInvalid: Locator;
    lastNameInvalid: Locator;
    nameLength: Locator;
    lastNameLength: Locator;
    passwordInvalid: Locator;
  };

  constructor(private readonly page: Page) {
    this.dialog = this.page.getByRole("dialog");

    this.nameInput = this.page.locator("#signupName");
    this.lastNameInput = this.page.locator("#signupLastName");
    this.emailInput = this.page.locator("#signupEmail");
    this.passwordInput = this.page.locator("#signupPassword");
    this.repeatPasswordInput = this.page.locator("#signupRepeatPassword");

    this.registerButton = this.page.getByRole("button", { name: "Register" });

    this.errors = {
      nameRequired: this.page.getByText("Name required", { exact: true }),
      lastNameRequired: this.page.getByText("Last name required", {
        exact: true,
      }),
      emailRequired: this.page.getByText("Email required", { exact: true }),
      emailIncorrect: this.page.getByText("Email is incorrect", {
        exact: true,
      }),
      passwordRequired: this.page.getByText("Password required", {
        exact: true,
      }),
      repeatPasswordRequired: this.page.getByText(
        "Re-enter password required",
        { exact: true },
      ),
      nameInvalid: this.page.getByText("Name is invalid", { exact: true }),
      lastNameInvalid: this.page.getByText("Last name is invalid", {
        exact: true,
      }),
      nameLength: this.page.getByText(
        "Name has to be from 2 to 20 characters long",
        { exact: true },
      ),
      lastNameLength: this.page.getByText(
        "Last name has to be from 2 to 20 characters long",
        { exact: true },
      ),
      passwordInvalid: this.page.getByText(
        "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
        { exact: true },
      ),
    };
  }

  async fillForm(user: RegistrationData): Promise<void> {
    await this.nameInput.fill(user.name ?? "");
    await this.lastNameInput.fill(user.lastName ?? "");
    await this.emailInput.fill(user.email ?? "");
    await this.passwordInput.fill(user.password ?? "");
    await this.repeatPasswordInput.fill(user.repeatPassword ?? "");
  }

  async submit(): Promise<void> {
    await this.registerButton.click();
  }

  async register(user: RegistrationData): Promise<void> {
    await this.fillForm(user);
    await this.submit();
  }

  async triggerRepeatPasswordRequiredValidation(): Promise<void> {
    await this.repeatPasswordInput.click();
    await this.emailInput.click();
  }

  async expectVisible(): Promise<void> {
    await expect(this.dialog).toBeVisible();
  }

  async expectHidden(): Promise<void> {
    await expect(this.dialog).toBeHidden();
  }

  async expectErrorVisible(error: Locator): Promise<void> {
    await expect(error).toBeVisible();
  }

  async expectInputBorderRed(input: Locator): Promise<void> {
    await expect(input).toHaveCSS("border-color", "rgb(220, 53, 69)");
  }

  async expectRegisterButtonDisabled(): Promise<void> {
    await expect(this.registerButton).not.toBeEnabled();
  }
}
