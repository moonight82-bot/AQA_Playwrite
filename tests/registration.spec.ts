import { test } from "@playwright/test";
import { HomePage } from "../src/pages/HomePage";
import { GaragePage } from "../src/pages/GaragePage";
import {
  generateEmail,
  validRegistrationUser,
} from "../src/utils/registrationTestData";

test.describe("Registration", () => {
  test("TC1: Verify that the user can be registered with valid data", async ({
    page,
  }) => {
    const homePage = new HomePage(page);
    const garagePage = new GaragePage(page);

    await homePage.open();
    await homePage.openRegistrationModal();

    await homePage.registrationModal.register(validRegistrationUser());

    await homePage.registrationModal.expectHidden();
    await garagePage.expectOpened();
  });

  test("TC2: Verify that the user cannot be registered with empty fields", async ({
    page,
  }) => {
    const homePage = new HomePage(page);
    const registrationModal = homePage.registrationModal;

    await homePage.open();
    await homePage.openRegistrationModal();

    await registrationModal.fillForm({
      name: "",
      lastName: "",
      email: `aqa_smith_${Date.now()}m`,
      password: "***",
      repeatPassword: "123",
    });

    await registrationModal.expectErrorVisible(
      registrationModal.errors.nameRequired,
    );
    await registrationModal.expectErrorVisible(
      registrationModal.errors.lastNameRequired,
    );
    await registrationModal.expectErrorVisible(
      registrationModal.errors.emailIncorrect,
    );
    await registrationModal.expectErrorVisible(
      registrationModal.errors.passwordInvalid,
    );
    await registrationModal.expectInputBorderRed(
      registrationModal.passwordInput,
    );
    await registrationModal.expectRegisterButtonDisabled();
  });

  test("TC3: Verify that the user cannot be registered with wrong name format, empty email and re-password", async ({
    page,
  }) => {
    const homePage = new HomePage(page);
    const registrationModal = homePage.registrationModal;

    await homePage.open();
    await homePage.openRegistrationModal();

    await registrationModal.fillForm({
      name: "12",
      lastName: "**",
      email: "",
      password: "Password123",
      repeatPassword: "",
    });

    await registrationModal.expectErrorVisible(
      registrationModal.errors.nameInvalid,
    );
    await registrationModal.expectInputBorderRed(registrationModal.nameInput);

    await registrationModal.expectErrorVisible(
      registrationModal.errors.lastNameInvalid,
    );
    await registrationModal.expectInputBorderRed(
      registrationModal.lastNameInput,
    );

    await registrationModal.expectErrorVisible(
      registrationModal.errors.emailRequired,
    );
    await registrationModal.expectInputBorderRed(registrationModal.emailInput);

    await registrationModal.expectRegisterButtonDisabled();
  });

  test("TC4: Verify that the user cannot be registered with wrong name length, email border is red", async ({
    page,
  }) => {
    const homePage = new HomePage(page);
    const registrationModal = homePage.registrationModal;

    await homePage.open();
    await homePage.openRegistrationModal();

    await registrationModal.fillForm({
      name: "T",
      lastName: "Edrfsavdfrgctyhfbvdtg",
      email: "",
      password: "Password123",
    });

    await registrationModal.expectErrorVisible(
      registrationModal.errors.nameLength,
    );

    await registrationModal.expectErrorVisible(
      registrationModal.errors.lastNameLength,
    );

    await registrationModal.expectInputBorderRed(registrationModal.emailInput);

    await registrationModal.expectRegisterButtonDisabled();
  });

  test("TC5: Verify that the user cannot be registered with wrong re-password", async ({
    page,
  }) => {
    const homePage = new HomePage(page);
    const registrationModal = homePage.registrationModal;

    await homePage.open();
    await homePage.openRegistrationModal();

    await registrationModal.fillForm({
      name: "Anna",
      lastName: "Smith",
      email: generateEmail("mail.com"),
      password: "Password123",
      repeatPassword: "",
    });
    await registrationModal.triggerRepeatPasswordRequiredValidation();

    await registrationModal.expectErrorVisible(
      registrationModal.errors.repeatPasswordRequired,
    );
    await registrationModal.expectInputBorderRed(
      registrationModal.repeatPasswordInput,
    );
    await registrationModal.expectRegisterButtonDisabled();
  });

  test("TC6: Verify that the user cannot be registered with wrong password format", async ({
    page,
    }) => {
    const homePage = new HomePage(page);
    const registrationModal = homePage.registrationModal;

    await homePage.open();
    await homePage.openRegistrationModal();

    await registrationModal.fillForm({
      name: "Anna",
      lastName: "Smith",
      email: generateEmail("mail.com"),
      password: "111111111",
      repeatPassword: "111111111",
    });

    await registrationModal.expectErrorVisible(
      registrationModal.errors.passwordInvalid,
    );
    await registrationModal.expectInputBorderRed(
      registrationModal.passwordInput,
    );
    await registrationModal.expectRegisterButtonDisabled();
  });
});
