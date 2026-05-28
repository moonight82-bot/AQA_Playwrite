import { test as base, expect } from "@playwright/test";
import { GaragePage } from "../../src/pages/GaragePage";

type Fixtures = {
  userGaragePage: GaragePage;
};

export const test = base.extend<Fixtures>({
  userGaragePage: async ({ browser }, use) => {
    const context = await browser.newContext({
      storageState: ".auth/user.json",
    });

    const page = await context.newPage();
    const userGaragePage = new GaragePage(page);

    await userGaragePage.open();

    await use(userGaragePage);

    await context.close();
  },
});

export { expect };
