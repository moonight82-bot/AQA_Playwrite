import { test, expect } from "@playwright/test";

test("login via API and save auth state", async ({ request }) => {
  const response = await request.post("/api/auth/signin", {
    data: {
      email: process.env.USER_EMAIL,
      password: process.env.USER_PASSWORD,
      remember: false,
    },
  });

  expect(response.status()).toBe(200);

  await request.storageState({ path: ".auth/user.json" });
});
