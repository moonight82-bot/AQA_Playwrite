export type RegistrationData = {
  name?: string;
  lastName?: string;
  email?: string;
  password?: string;
  repeatPassword?: string;
};

export const generateEmail = (domain = "example.com"): string =>
  `aqa_smith_${Date.now()}@${domain}`;

export const validRegistrationUser = (): RegistrationData => ({
  name: "Johnson",
  lastName: "Smithhhh",
  email: generateEmail(),
  password: "Password123",
  repeatPassword: "Password123",
});
