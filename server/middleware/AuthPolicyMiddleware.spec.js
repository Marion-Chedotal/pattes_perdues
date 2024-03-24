const {
  register,
  passwordRegex,
  loginRegex,
} = require("./AuthPolicyMiddleware.js");

describe("Policy input for register", () => {
  let req, res, next;

  beforeEach(() => {
    req = { body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it("should call next middleware when all inputs are valid", () => {
    // Arrange
    req.body = {
      email: "email-e@jest-test.fr",
      password: "Passwsord123!",
      login: "Username123!",
    };

    // Act
    register(req, res, next);

    // Assert
    expect(next).toHaveBeenCalled();
    expect(req.body.password).toMatch(passwordRegex);
    expect(req.body.login).toMatch(loginRegex);
  });

  it("should return error if email format is invalid", () => {
    // Arrange
    req.body = {
      email: "email-e@univ-testfr",
      password: "Passwsord123!",
      login: "Username!123",
    };

    // Act
    register(req, res, next);

    // Assert
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Format de l'email non valide: exemple@pattesperdues.com",
    });
  });

  it("should return error if password format is invalid", () => {
    // Arrange
    req.body = {
      email: "email-e@univ-test.fr",
      password: "Password123",
      login: "Username!123",
    };

    // Act
    register(req, res, next);

    // Assert
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error:
        "Format du mot de passe non valide. Doit contenir entre 10 et 32 caractères alphanumériques dont des majuscules, minuscules, caractères spéciaux et des chiffres.",
    });
  });

  it("should return error if login format is invalid", () => {
    // Arrange
    req.body = {
      email: "email-e@jest-test.fr",
      password: "Passwsord123!",
      login: "username!123",
    };

    // Act
    register(req, res, next);

    // Assert
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error:
        "Format du login non valide. Doit être compris entre 8 et 20 caractères alphanumériques, dont une majuscule.",
    });
  });
});
