import { test, expect } from "@playwright/test";

test("TC1: Verify that the user can be registered with valid data", async ({
  page,
}) => {
  await page.goto("https://guest:welcome2qauto@qauto.forstudy.space/");

  await page.getByRole("button", { name: "Sign up" }).click();

  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();

  const nameInput = page.locator("#signupName");
  const lastNameInput = page.locator("#signupLastName");
  const emailInput = page.locator("#signupEmail");
  const passwordInput = page.locator("#signupPassword");
  const confirmPasswordInput = page.locator("#signupRepeatPassword");
  const submitButton = page.getByRole("button", { name: "Register" });

  await nameInput.fill("Johnson");
  await lastNameInput.fill("Smiththth");
  await emailInput.fill(`aqa_smith_${Date.now()}@example.com`);
  await passwordInput.fill("Password123");
  await confirmPasswordInput.fill("Password123");

  await submitButton.click();

  await expect(dialog).toBeHidden();
  await expect(page).toHaveURL(/garage/);
  await expect(page.getByRole("heading", { name: "Garage" })).toBeVisible();
});

test("TC2: Verify that the user cannot be registered with empty fields", async ({
  page,
}) => {
  await page.goto("https://guest:welcome2qauto@qauto.forstudy.space/");

  await page.getByRole("button", { name: "Sign up" }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();

  const nameInput = page.locator("#signupName");
  const lastNameInput = page.locator("#signupLastName");
  const emailInput = page.locator("#signupEmail");
  const passwordInput = page.locator("#signupPassword");
  const confirmPasswordInput = page.locator("#signupRepeatPassword");
  const submitButton = page.getByRole("button", { name: "Register" });

  await nameInput.fill("");
  await lastNameInput.fill("");
  await emailInput.fill(`aqa_smith_${Date.now()}m`);
  await passwordInput.fill("***");
  await confirmPasswordInput.fill("123");

  await expect(page.getByText('Name required', { exact: true })).toBeVisible();
  await expect(page.getByText("Last name required")).toBeVisible();
  await expect(page.getByText("Email is incorrect")).toBeVisible();
  await expect(
      page.getByText(
        "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
      ),
    ).toBeVisible();
  await expect(page.locator("#signupPassword")).toHaveCSS(
    "border-color",
    "rgb(220, 53, 69)",
  );
  
  
  await expect(submitButton).not.toBeEnabled();

  
});


test("TC3: Verify that the user cannot be registered with wrong data name format, epmty email and re-password", async ({
  page,
}) => {
  await page.goto("https://guest:welcome2qauto@qauto.forstudy.space/");

  await page.getByRole("button", { name: "Sign up" }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();

  const nameInput = page.locator("#signupName");
  const lastNameInput = page.locator("#signupLastName");
  const emailInput = page.locator("#signupEmail");
  const passwordInput = page.locator("#signupPassword");
  const confirmPasswordInput = page.locator("#signupRepeatPassword");
  const submitButton = page.getByRole("button", { name: "Register" });

  await nameInput.fill("12");
  await lastNameInput.fill("**");
  await emailInput.fill(``);
  await passwordInput.fill("Password123");
  await confirmPasswordInput.fill("");
 

  await expect(
    page.getByText("Name is invalid", { exact: true }),
  ).toBeVisible();
  await expect(page.locator("#signupName")).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)",
    );
  await expect(page.getByText("Last name is invalid")).toBeVisible();
  await expect(page.locator("#signupLastName")).toHaveCSS(
     "border-color",
     "rgb(220, 53, 69)",
   );
  await expect(page.getByText("Email required")).toBeVisible();
  await expect(page.locator("#signupEmail")).toHaveCSS(
    "border-color",
    "rgb(220, 53, 69)",
    );

  await expect(submitButton).not.toBeEnabled();
});

test("TC4: Verify that the user cannot be registered with wrong name length, email border is red", async ({
  page,
}) => {
  await page.goto("https://guest:welcome2qauto@qauto.forstudy.space/");

  await page.getByRole("button", { name: "Sign up" }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();

  const nameInput = page.locator("#signupName");
  const lastNameInput = page.locator("#signupLastName");
  const emailInput = page.locator("#signupEmail");
  const passwordInput = page.locator("#signupPassword");
  const confirmPasswordInput = page.locator("#signupRepeatPassword");
  const submitButton = page.getByRole("button", { name: "Register" });

  await nameInput.fill("T");
  await lastNameInput.fill("Edrfsavdfrgctyhfbvdtg");
  await emailInput.fill(``);
  await passwordInput.fill("Password123");
  
  await expect(
    page.getByText("Name has to be from 2 to 20 characters long", {
      exact: true,
    }),
  ).toBeVisible();
  await expect(
    page.getByText("Last name has to be from 2 to 20 characters long"),
  ).toBeVisible();
  await expect(page.locator("#signupEmail")).toHaveCSS(
    "border-color",
    "rgb(220, 53, 69)",
  );
    await expect(submitButton).not.toBeEnabled();
});

test("TC5: Verify that the user cannot be registered with wrong re-password", async ({
  page,
}) => {
  await page.goto("https://guest:welcome2qauto@qauto.forstudy.space/");

  await page.getByRole("button", { name: "Sign up" }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();

  const nameInput = page.locator("#signupName");
  const lastNameInput = page.locator("#signupLastName");
  const emailInput = page.locator("#signupEmail");
  const passwordInput = page.locator("#signupPassword");
  const confirmPasswordInput = page.locator("#signupRepeatPassword");
  const submitButton = page.getByRole("button", { name: "Register" });

  await nameInput.fill("Anna");
  await lastNameInput.fill("Smith");
  await emailInput.fill(`aqa_smith_${Date.now()}@mail.com`);
  await passwordInput.fill("Password123");
  await confirmPasswordInput.fill("");
  await confirmPasswordInput.click();
  await nameInput.click();

  await expect(page.getByText("Re-enter password required")).toBeVisible();
  await expect(page.locator("#signupRepeatPassword")).toHaveCSS(
    "border-color",
    "rgb(220, 53, 69)",
  );
  
  await expect(submitButton).not.toBeEnabled();
});

test("TC6: Verify that the user cannot be registered with wrong password format", async ({
  page,
}) => {
  await page.goto("https://guest:welcome2qauto@qauto.forstudy.space/");

  await page.getByRole("button", { name: "Sign up" }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();

  const nameInput = page.locator("#signupName");
  const lastNameInput = page.locator("#signupLastName");
  const emailInput = page.locator("#signupEmail");
  const passwordInput = page.locator("#signupPassword");
  const confirmPasswordInput = page.locator("#signupRepeatPassword");
  const submitButton = page.getByRole("button", { name: "Register" });

  await nameInput.fill("Anna");
  await lastNameInput.fill("Smith");
  await emailInput.fill(`aqa_smith_${Date.now()}@mail.com`);
  await passwordInput.fill("111111111");
  await confirmPasswordInput.fill("111111111");


await expect(
  page.getByText(
    "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
  ),
).toBeVisible();
await expect(page.locator("#signupPassword")).toHaveCSS(
  "border-color",
  "rgb(220, 53, 69)",
);

  await expect(submitButton).not.toBeEnabled();
});