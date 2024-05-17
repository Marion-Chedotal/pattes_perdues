const { register } = require("./authenticationController");

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{10,32}$/;
const loginRegex = /^[a-zA-Z0-9-_]{8,}$/;

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
      login: "validlogin-1",
    },
    {
      email: "email-e@jest-test.fr",
      password: "wrongformat",
      login: "validlogin-1",
    },
    {
      email: "email-e@jest-test.fr",
      password: "Passwsord123!",
      login: "user-12",
    },
  ];

  it("should not throw an error when all inputs are valid", async () => {
    // Arrange
    req.body = {
      email: "email-e@jest-test.fr",
      password: "Passwsord123!",
      login: "validlogin-1",
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
