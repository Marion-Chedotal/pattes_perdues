const UserService = require("../service/UserService");
const AddressService = require("../service/AddressService");
const AuthenticationService = require("../service/AuthenticationService");
const errors = require("../utils/errors.json");
const bcrypt = require("bcryptjs");
const { escapeHtml } = require("../utils/htmlEscape");
const { passwordRegex } = require("./AuthenticationController");
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

  try {
    const user = await UserService.getById(id);

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
 * Update user's data
 * @param {object} req
 * @param {object} res
 * @returns {string} string success
 * @throws {object} error
 */
const updateUser = async (req, res) => {
  const login = req.params.login;
  const currentUserId = req.id_user;

  const userToEdit = await UserService.getByLogin(login);
 
  const isUserAllowed = AuthenticationService.checkUserPermission(
    currentUserId,
    userToEdit.id_user
  );

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

  // Check input format
  const { error } = validateUpdateInput(req.body);

  if (error) {

    return res.status(400).json({
      errorCode: "invalidInput",
      errorMessage: errors.global.invalidInput,
    });
  }

  let { password, email, avatar, postalCode, city } = req.body;

  if (postalCode !== userToEdit.Address.postalCode && !city) {
    return res.status(400).json({
      errorCode: "noCity",
      errorMessage: errors.global.noCity,
    });
  }

  if (isUserAllowed) {
    try {
      // Check if user already exist: same email
      if (userToEdit.email !== email) {
        const isEmailAlreadyExist = await UserService.checkEmailExists(email);
        if (isEmailAlreadyExist) {
          return res.status(400).json("Email already used");
        }
      }
      let hashPassword;
      if (password) {
        hashPassword = await bcrypt.hash(password, 10);
        req.body.password = hashPassword;
      }

      let avatarPath;
      if (req.files && req.files.avatar && req.files.avatar.length > 0) {
        avatarPath = req.files.avatar[0].path;

        // Delete old avatar from server
        if (userToEdit.avatar) {
          fs.unlinkSync(user.avatar);
        }
      }

      const userUpdated = await UserService.editUser(currentUserId, {
        password: hashPassword,
        email: email,
        avatar: avatarPath,
      });
      await AddressService.editAddress(userToEdit.id_address, {
        postalCode: postalCode,
        city: city,
      });

      if (!userUpdated) {
        return res
          .status(400)
          .json({ error: `User ${currentUserId} doesn't exist` });
      }

      res.status(200).json({
        message: `The user ${userToEdit.login} has been successfully updated`,
      });
    } catch (error) {
      res.status(500).json({
        error: `Error when updating user, ${error}`,
      });
    }
  } else {
    res.status(403).json({
      error: `You don't have the rights`,
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

  const userToRemove = await UserService.getByLogin(login);
  const currentUserId = req.id_user;

  const isUserAllowed = AuthenticationService.checkUserPermission(
    currentUserId,
    userToRemove.id_user
  );

  if (isUserAllowed) {
    try {
      const user = await UserService.deleteUser(userToRemove.id_user);

      if (!user) {
        return res.status(400).json({ error: `User ${userToRemove.id_user} doesn't exist` });
      }
      const login = user.login;

      res.status(200).json(`The user ${login} has been successfully deleted`);
    } catch (error) {
      res.status(500).json({
        error: `Error when deleting user, ${error}`,
      });
    }
  } else {
    res.status(403).json({
      error: `You don't have the rights`,
    });
  }
};

module.exports = { findById, updateUser, removeUser };
