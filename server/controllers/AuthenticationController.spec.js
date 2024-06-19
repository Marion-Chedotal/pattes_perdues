const {
  passwordRegex,
  loginRegex,
  register,
} = require("./authenticationController");
const userService = require("./../service/userService");

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
      login: "valid-login-1",
      email: "wrong-email-format",
      password: "Password123!",
      postalCode: 56000,
      city: "city",
    },
    {
      login: "valid-login-1",
      email: "email-e@jest-test.fr",
      password: "wrongformat",
      postalCode: 56000,
      city: "city",
    },
    {
      login: "kologin",
      email: "email-e@jest-test.fr",
      password: "Passwsord123!",
      postalCode: 56000,
      city: "city",
    },
    {
      login: "valid-login-1",
      email: "email-e@jest-test.fr",
      password: "Passwsord123!",
      postalCode: "wrong-postalCode",
      city: "city",
    },
    {
      login: "valid-login-1",
      email: "email-e@jest-test.fr",
      password: "Passwsord123!",
      postalCode: 56000,
      city: 5,
    },
  ];

  it("should not throw an error when all inputs are valid", async () => {
    // Arrange
    req.body = {
      login: "validlogin-1",
      email: "email-e@jest-test.fr",
      password: "Passwsord123!",
      postalCode: 56000,
      city: "vannes",
    };

    // Act
    // const result = await register(req, res);
    // console.log(result, "result");
    // Assert
    expect(req.body.login).toMatch(loginRegex);
    expect(req.body.password).toMatch(passwordRegex);
  });

  invalidInputs.forEach((input) => {
    it.skip(`should return error if input format is invalid`, async () => {
      // Arrange
      const req = { body: input };

      // Act
      await register(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        errorCode: "invalidInput",
        errorMessage: "Invalid input format.",
      });
    });
  });

  it.skip(`should return error if some fields are empty`, async () => {
    // Arrange
    req.body = {
      login: "validlogin-1",
      email: "email-e@jest-test.fr",
      password: "Passwsord123!",
      postalCode: 56000,
      city: "",
    };

    // Act
    await register(req, res);

    // Assert
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      errorCode: "fieldsToFill",
      errorMessage: "Please fill in all fields",
    });
  });

  it.skip(`should return error if email already exist`, async () => {
    // Arrange
    req.body = {
      login: "validlogin-1",
      email: "Marion@test.fr",
      password: "Passwsord123!",
      postalCode: 56000,
      city: "vannes",
    };

    userService.checkEmailExists = jest.fn().mockResolvedValue(true);

    // Act
    await register(req, res);

    // Assert
    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({
      errorCode: "emailExist",
      errorMessage: "Email already used",
    });
  });
  it.skip(`should return error if login already exist`, async () => {
    // Arrange
    req.body = {
      login: "Marion-m",
      email: "Marion@test.fr",
      password: "Passwsord123!",
      postalCode: 56000,
      city: "vannes",
    };

    userService.checkLoginExists.mockResolvedValue(true);
    // Act
    await register(req, res);

    // Assert
    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({
      errorCode: "loginExist",
      errorMessage: "Login already used",
    });
  });
});
