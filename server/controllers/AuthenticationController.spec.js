const { register } = require("./AuthenticationController.js");

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{10,32}$/;
const loginRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9_!@#$%^&*()\-+=]{8,20}$/;

describe("Policy input for register", () => {
  beforeEach(() => {
    req = { body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  const invalidInputs = [
    {
      email: "invalid-email-format",
      password: "Password123!",
      login: "ValidLogin123",
    },
    {
      email: "email-e@jest-test.fr",
      password: "wrongformat",
      login: "ValidLogin123",
    },
    {
      email: "email-e@jest-test.fr",
      password: "Passwsord123!",
      login: "username123",
    },
  ];

  it("should not throw an error when all inputs are valid", async () => {
    // Arrange
    req.body = {
      email: "email-e@jest-test.fr",
      password: "Passwsord123!",
      login: "Username123!",
    };

    // Act
    await register(req, res);

    // Assert
    expect(req.body.password).toMatch(passwordRegex);
    expect(req.body.login).toMatch(loginRegex);
  });

  invalidInputs.forEach((input) => {
    it(`should return error if email format is invalid`, async () => {
      // Arrange

      const req = { body: input };

      // Act
      await register(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: "Invalid input format" });
    });
  });
});
