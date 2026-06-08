import { test, expect } from "@playwright/test";

test.describe("QAuto API - Cars", () => {
  test("TC1: should create a car with valid data", async ({ request }) => {
    const response = await request.post("/api/cars", {
      data: {
        carBrandId: 1,
        carModelId: 1,
        mileage: 100,
      },
    });

    expect(response.status()).toBe(201);

    const body = await response.json();

    expect(body.status).toBe("ok");
    expect(body.data.id).toBeDefined();
    expect(body.data.carBrandId).toBe(1);
    expect(body.data.carModelId).toBe(1);
    expect(body.data.mileage).toBe(100);

    const carId = body.data.id;

    const deleteResponse = await request.delete(`/api/cars/${carId}`);

    expect(deleteResponse.status()).toBe(200);
  });

  test("TC2: should not create a car without mileage", async ({ request }) => {
    const response = await request.post("/api/cars", {
      data: {
        carBrandId: 1,
        carModelId: 1,
      },
    });

    expect(response.status()).toBe(401);

    const body = await response.json();

    expect(body.status).toBe("error");
  });

  test("TC3: should not create a car with invalid brand id", async ({
    request,
  }) => {
    const response = await request.post("/api/cars", {
      data: {
        carBrandId: 999999,
        carModelId: 1,
        mileage: 100,
      },
    });

    expect(response.status()).toBe(401);

    const body = await response.json();

    expect(body.status).toBe("error");
  });
});
