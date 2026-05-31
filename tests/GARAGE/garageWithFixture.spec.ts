import { test } from "../fixtures/userGaragePageFixture";

test("TC: Add car modal is opened from Garage page", async ({
  userGaragePage,
}) => {
  await userGaragePage.expectOpened();

  await userGaragePage.openAddCarModal();

  await userGaragePage.expectAddCarModalOpened();
});
