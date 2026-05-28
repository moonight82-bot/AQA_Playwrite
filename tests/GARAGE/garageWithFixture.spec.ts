import { test, expect } from "../fixtures/userGaragePageFixture";

test("TC: Add car modal is opened from Garage page", async ({
  userGaragePage,
}) => {
  await userGaragePage.expectOpened();

  await userGaragePage.addCarButton.click();

  await expect(userGaragePage.page.getByRole("dialog")).toBeVisible();
  await expect(userGaragePage.page.getByText("Add a car")).toBeVisible();
});
