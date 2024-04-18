const bcrypt = require("bcryptjs");
const Joi = require("joi");
const { escapeHtml } = require("../utils/htmlEscape");
const AuthenticationService = require("../service/AuthenticationService");
const UserService = require("../service/UserService");
const AddressService = require("../service/AddressService");

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*()_+])[A-Za-z\d!@#$%&*()_+]{10,32}$/;
const loginRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9]{8,20}$/;

/**
 * Validate register input using a Joi schema.
 * @param {object} data - The data to be validated.
 * @param {string} data.email - email
 * @param {string} data.password - password.
 * @param {string} data.login - login.
 * @param {number} data.postalCode - postal code .
 * @param {string} data.city - city.
 * @returns {Joi.ValidationResult<object>} - The result of the validation. 
 */
const validateInput = (data) => {
  const schema = Joi.object({
    email: Joi.string().email(),
    password: Joi.string().regex(new RegExp(passwordRegex)),
    login: Joi.string().regex(new RegExp(loginRegex)),
    postalCode: Joi.number().integer(),
    city: Joi.string(),
  });

  return schema.validate(data);
};

/**
 * Register a new user
 * @param {object} req
 * @param {object} res
 * @returns {string} string success
 * @throws {object} error
 */
const register = async (req, res) => {
  try {
    // Get user input
    let { login, password, email, postalCode, city } = req.body;

    // Check input format
    const { error } = validateInput(req.body);
    if (error) {
      return res.status(400).json({ error: "Invalid input format" });
    }

    // sanitize input
    email = escapeHtml(email.trim());

    // Check if user already exist: same email
    const isEmailAlreadyExist = await UserService.checkEmailExists(
      req.body.email
    );
    if (isEmailAlreadyExist) {
      return res.status(400).json("Email already used");
    }

    // Check if user already exist: same login
    const isLoginAlreadyExist = await UserService.checkLoginExists(
      req.body.login
    );
    if (isLoginAlreadyExist) {
      return res.status(400).json("Login already used");
    }

    // Encrypt user password
    const hashPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await UserService.registerUser({
      login: login,
      password: hashPassword,
      email: email,
    });

    const address = await AddressService.addAddress({
      postalCode: postalCode,
      city: city,
    });

    await user.setAddress(address);

    res.status(201).json(`User ${login} has been successfully registered`);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: `Error when register user, ${error}`,
    });
  }
};

/**
 * Log a user
 * @param {object} req
 * @param {object} res
 * @returns {object} object of accessTokenUser, idUser and login
 * @throws {object} Error
 */
const login = async (req, res) => {
  try {
    let { login, password } = req.body;

    if (!(login && password)) {
      return res.status(400).json({ error: "Please fill in all fields" });
    }

    // Check input format
    const schema = Joi.object({
      password: Joi.string().regex(new RegExp(passwordRegex)),
      login: Joi.string().regex(new RegExp(loginRegex)),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: "Invalid input format",
      });
    }

    const user = await UserService.getByLogin(login);

    if (!user) {
      return res.status(404).json({ error: "Invalid informations" });
    }

    const dbPassword = user.password;
    const passwordMatch = await AuthenticationService.comparePasswords(
      password,
      dbPassword
    );
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid informations" });
    }

    const accessToken = AuthenticationService.createToken(user.login, user.id);

    res.cookie("access-token", accessToken, {
      maxAge: 2 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: true,
    });

    res.status(200).json({
      login: login,
      id: user.id,
      accessToken: accessToken
    });
  } catch (error) {
    res.status(500).json({ error: `Authentication error: ${error}` });
  }
};

/**
 * Log out user by destroying his JWT
 * @param {object} req
 * @param {object} res
 * @returns {string} string success
 * @throws {object} error
 */
const logout = async (req, res) => {
  try {
    if (req.cookies["access-token"]) {
      res.clearCookie("access-token", {
        secure: true,
        samesite: true,
      });
      return res
        .status(200)
        .json({ message: "You have been successfully disconnected" });
    } else {
      return res.status(400).json({ message: "No cookie to delete" });
    }
  } catch (error) {
    res.status(500).json({ error: `Error when logout, ${error}` });
  }
};

module.exports = { validateInput, register, login, logout };
