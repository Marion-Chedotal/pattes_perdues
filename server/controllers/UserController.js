const userService = require("../service/userService");
const authenticationService = require("../service/authenticationService");
const errors = require("../utils/errors.json");
const bcrypt = require("bcryptjs");
const { escapeHtml } = require("../utils/htmlEscape");
const { passwordRegex } = require("./authenticationController");
const Joi = require("joi");
const fs = require("fs");

const validateUpdateInput = (data) => {
  const schema = Joi.object({
    password: Joi.string().regex(new RegExp(passwordRegex)).allow(""),
    email: Joi.string().email(),
    avatar: Joi.string().dataUri().allow(""),
    postalCode: Joi.number().integer(),
    city: Joi.string().allow(""),
  });

  return schema.validate(data);
};

/**
 * Get user by his id
 * @param {object} req
 * @param {object} res
 * @returns {object} user's data
 * @throws {object} error
 */
const findById = async (req, res) => {
  const id = parseInt(req.params.id, 10);

  const currentUserId = req.userId;

  const isUserAllowed = authenticationService.checkUserPermission(
    currentUserId,
    id
  );

  if (!isUserAllowed) {
    return res.status(403).json({
      error: `You don't have the rights`,
    });
  }
  try {
    const user = await userService.getById(id);

    if (!user) {
      return res.status(400).json({ error: `User ${id} doesn't exist` });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      error: `Error when fetching user, ${error}`,
    });
  }
};

/**
 * Get user by his login
 * @param {object} req
 * @param {object} res
 * @returns {object} user's data
 * @throws {object} error
 */
const findByLogin = async (req, res) => {
  const login = req.params.login;

  try {
    const user = await userService.getByLogin(login);

    if (!user) {
      return res.status(400).json({ error: `User ${login} doesn't exist` });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      error: `Error when fetching user by login, ${error}`,
    });
  }
};

/**
 * Update user's data
 * @param {object} req
 * @param {object} res
 * @returns {string} string success
 * @throws {object} error
 */
const updateUser = async (req, res) => {
  const login = req.params.login;
  const currentUserId = req.userId;

  const user = await userService.getByLogin(login);

  const userId = user?.id;

  const isUserAllowed = authenticationService.checkUserPermission(
    currentUserId,
    userId
  );

  if (!isUserAllowed) {
    return res.status(403).json({
      error: `You don't have the rights`,
    });
  }

  // Check input format
  const { error } = validateUpdateInput(req.body);

  if (error) {
    return res.status(400).json({
      errorCode: "invalidInput",
      errorMessage: errors.global.invalidInput,
    });
  }

  // sanitize input
  const fieldsToSanitize = [
    "password",
    "email",
    "avatar",
    "postalCode",
    "city",
  ];

  fieldsToSanitize.forEach((fieldName) => {
    if (req.body[fieldName]) {
      req.body[fieldName] = escapeHtml(req.body[fieldName].trim());
    }
  });

  let { password, email, avatar, postalCode, city } = req.body;

  if (postalCode !== user?.postalCode && !city) {
    return res.status(400).json({
      errorCode: "noCity",
      errorMessage: errors.global.noCity,
    });
  }

  try {
    // Check if user already exist: same email
    if (user.email !== email) {
      const isEmailAlreadyExist = await userService.checkEmailExists(email);
      if (isEmailAlreadyExist) {
        return res.status(409).json({
          errorCode: "emailExist",
          errorMessage: errors.authentication.emailExist,
        });
      }
    }
    if (!city) city = user.city;

    let hashPassword;
    if (password) {
      hashPassword = await bcrypt.hash(password, 10);
      req.body.password = hashPassword;
    }

    let avatarPath;
    if (req.files && req.files.avatar && req.files.avatar.length > 0) {
      avatarPath = req.files.avatar[0].path;

      // Delete old avatar from server
      if (user.avatar) {
        fs.unlinkSync(user.avatar);
      }
    }

    const userUpdated = await userService.editUser(currentUserId, {
      password: hashPassword,
      email: email,
      avatar: avatarPath,
      postalCode: postalCode,
      city: city,
    });

    if (!userUpdated) {
      return res
        .status(400)
        .json({ error: `User ${currentUserId} doesn't exist` });
    }

    res.status(200).json(userUpdated);
  } catch (error) {
    res.status(500).json({
      error: `Error when updating user, ${error}`,
    });
  }
};

/**
 * Delete a user
 * @param {object} req
 * @param {object} res
 * @returns {string} string success
 * @throws {object} Error
 */
const removeUser = async (req, res) => {
  const login = req.params.login;

  const user = await userService.getByLogin(login);
  const userId = user?.id;
  const currentUserId = req.userId;

  const isUserAllowed = authenticationService.checkUserPermission(
    currentUserId,
    userId
  );

  if (!isUserAllowed) {
    return res.status(403).json({
      error: `You don't have the rights`,
    });
  }

  try {
    const user = await userService.deleteUser(userId);

    if (!user) {
      return res.status(400).json({ error: `User ${userId} doesn't exist` });
    }
    const login = user.login;

    res.status(200).json(`The user ${login} has been successfully deleted`);
  } catch (error) {
    res.status(500).json({
      error: `Error when deleting user, ${error}`,
    });
  }
};

module.exports = { findById, findByLogin, updateUser, removeUser };
