const UserService = require("../service/UserService");
const AddressService = require("../service/AddressService");
const AuthenticationService = require("../service/AuthenticationService");
const { validateInput } = require("./AuthenticationController");
const bcrypt = require("bcryptjs");
const { escapeHtml } = require("../utils/htmlEscape");

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
 * Get user by his login
 * @param {object} req
 * @param {object} res
 * @returns {object} user's data
 * @throws {object} error
 */
const findByLogin = async (req, res) => {
  const login = req;

  try {
    const user = await UserService.getByLogin(login);

    if (!user) {
      return res.status(400).json({ error: `User ${login} doesn't exist` });
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
  const id = parseInt(req.params.id, 10);
  const currentUserId = req.user.id;

  // Get user input
  let { login, password, email, postalCode, city } = req.body;

  const isUserAllowed = AuthenticationService.checkUserPermission(
    currentUserId,
    id
  );

  // Validate user input
  const { error } = validateInput(req.body);
  if (error) {
    return res.status(400).json({ error: "Invalid input format" });
  }

  // sanitize input TODO: à voir car logiquement je reprends l'api
  city = escapeHtml(city);

  const currentUser = await UserService.getById(id);

  if (isUserAllowed) {
    try {
      // Check if user already exist: same email
      if (currentUser.email !== email) {
        email = escapeHtml(email.trim());
        const isEmailAlreadyExist = await UserService.checkEmailExists(email);
        if (isEmailAlreadyExist) {
          return res.status(400).json("Email already used");
        }
      }

      // Check if user already exist: same login
      if (currentUser.login !== login) {
        const isLoginAlreadyExist = await UserService.checkLoginExists(login);
        if (isLoginAlreadyExist) {
          return res.status(400).json("Login already used");
        }
      }

      if (password) {
        const hashPassword = await bcrypt.hash(password, 10);
        req.body.password = hashPassword;
      }
      await AddressService.editAddress(currentUser.AddressId, req.body);

      const user = await UserService.editUser(id, req.body);

      if (!user) {
        return res.status(400).json({ error: `User ${id} doesn't exist` });
      }
      res.status(200).json(`The user ${login} has been successfully updated`);
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

  const user = await UserService.getByLogin(login);
  const userId = user.id;
  const currentUserId = req.userId;

  const isUserAllowed = AuthenticationService.checkUserPermission(
    currentUserId,
    userId
  );

  if (isUserAllowed) {
    try {
      const user = await UserService.deleteUser(userId);

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
  } else {
    res.status(403).json({
      error: `You don't have the rights`,
    });
  }
};

module.exports = { findById, findByLogin, updateUser, removeUser };
