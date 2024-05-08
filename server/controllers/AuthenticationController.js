const bcrypt = require("bcryptjs");
const Joi = require("joi");
const { escapeHtml } = require("../utils/htmlEscape");
const AuthenticationService = require("../service/AuthenticationService");
const UserService = require("../service/UserService");
const AddressService = require("../service/AddressService");
const errors = require("../utils/errors.json");

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*()_+])[A-Za-z\d!@#$%&*()_+]{10,32}$/;
const loginRegex = /^[a-zA-Z0-9-_]{8,}$/;

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
    if (
      !(
        req.body.login &&
        req.body.password &&
        req.body.email &&
        req.body.postalCode &&
        req.body.city
      )
    ) {
      return res.status(400).json({
        errorCode: "fieldsToFill",
        errorMessage: errors.global.fieldsToFill,
      });
    }

    // sanitize input
    const fieldsToSanitize = [
      "login",
      "password",
      "email",
      "postalCode",
      "city",
    ];

    fieldsToSanitize.forEach((fieldName) => {
      req.body[fieldName] = escapeHtml(req.body[fieldName].trim());
    });

    // Check input format
    const { error } = validateInput(req.body);
    if (error) {
      return res.status(400).json({
        errorCode: "invalidInput",
        errorMessage: errors.global.invalidInput,
      });
    }

    // Get user input
    let { login, password, email, postalCode, city } = req.body;

    // Check if user already exist: same email
    const isEmailAlreadyExist = await UserService.checkEmailExists(email);

    if (isEmailAlreadyExist) {
      return res.status(409).json({
        errorCode: "emailExist",
        errorMessage: errors.authentication.global.emailExist,
      });
    }

    // Check if user already exist: same login
    const isLoginAlreadyExist = await UserService.checkLoginExists(login);

    if (isLoginAlreadyExist) {
      return res.status(409).json({
        errorCode: "loginExist",
        errorMessage: errors.authentication.global.loginExist,
      });
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
    if (!(req.body.login && req.body.password)) {
      return res.status(400).json({
        errorCode: "fieldsToFill",
        errorMessage: errors.global.fieldsToFill,
      });
    }

    // Check input format
    const schema = Joi.object({
      password: Joi.string().regex(new RegExp(passwordRegex)),
      login: Joi.string().regex(new RegExp(loginRegex)),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        errorCode: "invalidInformations",
        errorMessage: errors.authentication.global.invalidInformations,
      });
    }

    let { login, password } = req.body;

    const user = await UserService.getByLogin(login);

    if (!user) {
      return res.status(404).json({
        errorCode: "invalidInformations",
        errorMessage: errors.authentication.global.invalidInformations,
      });
    }

    const dbPassword = user.password;
    const passwordMatch = await AuthenticationService.comparePasswords(
      password,
      dbPassword
    );
    if (!passwordMatch) {
      return res.status(401).json({
        errorCode: "invalidInformations",
        errorMessage: errors.authentication.global.invalidInformations,
      });
    }

    const accessToken = AuthenticationService.createToken(user.login, user.id);

    res.status(200).json({
      user: { login: login, id: user.id },
      accessToken: accessToken,
    });
  } catch (error) {
    res.status(500).json({ error: `Authentication error: ${error}` });
  }
};

module.exports = { passwordRegex, validateInput, register, login };
