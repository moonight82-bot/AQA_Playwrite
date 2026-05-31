import { test as base, expect } from "@playwright/test";
import { GaragePage } from "../../src/pages/GaragePage";

type Fixtures = {
  userGaragePage: GaragePage;
};

export const test = base.extend<Fixtures>({
  userGaragePage: async ({ page }, use) => {
    const userGaragePage = new GaragePage(page);

    await userGaragePage.open();

    await use(userGaragePage);
  },
});

export { expect };
