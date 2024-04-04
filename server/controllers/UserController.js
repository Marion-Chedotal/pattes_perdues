const {
  checkEmailExists,
  checkLoginExists,
  getByLogin,
  getById,
  editUser,
  deleteUser,
} = require("../service/UserService");
const { editAddress } = require("../service/AddressService");
const { checkUserPersimission } = require("../service/AuthenticationService");
const { validateInput } = require("./AuthenticationController");
const bcrypt = require("bcryptjs");
const { escapeHtml } = require("../utils/htmlEscape.js");

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
    const user = await getById(id);
    console.log("user", user);
    if (!user) {
      return res
        .status(400)
        .json({ error: `L'utilisateur ${id} n'existe pas` });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      error: `Erreur lors de la récupération de l'utilisateur, ${error}`,
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
  const { login } = req.params;
  try {
    const user = await getByLogin(login);
    if (!user) {
      return res
        .status(400)
        .json({ error: `L'utilisateur ${login} n'existe pas` });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      error: `Erreur lors de la récupération de l'utilisateur, ${error}`,
    });
  }
};

// TODO: getByCity
// TODO: getByPostCode

/**
 * Update user's data
 * @param {object} req
 * @param {object} res
 * @returns {string} string success
 * @throws {object} error
 */
const updateUser = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const userId = req.user.id;

  // Get user input
  let { login, password, email, postalCode, city } = req.body;

  const userAllowed = checkUserPersimission(userId, id);

  // Validate user input
  const { error } = validateInput(req.body);
  if (error) {
    return res.status(400).json({ error: "Invalid input format" });
  }

  // sanitize input
  city = escapeHtml(city);

  const currentUser = await getById(id);

  if (userAllowed) {
    try {
      // Check if user already exist: same email
      if (currentUser.email !== email) {
        email = escapeHtml(email.trim());
        const isEmailAlreadyExist = await checkEmailExists(email);
        if (isEmailAlreadyExist) {
          return res.status(400).json("Email already used");
        }
      }

      // Check if user already exist: same login
      if (currentUser.login !== login) {
        const isLoginAlreadyExist = await checkLoginExists(login);
        if (isLoginAlreadyExist) {
          return res.status(400).json("Login already used");
        }
      }

      if (password) {
        const hashPassword = await bcrypt.hash(password, 10);
        req.body.password = hashPassword;
      }
      await editAddress(currentUser.AddressId, req.body);
      
      const user = await editUser(id, req.body);

      if (!user) {
        return res
          .status(400)
          .json({ error: `L'utilisateur ${id} n'existe pas` });
      }
      res.status(200).json(`L'utilisateur ${login} a bien été mis à jour`);
    } catch (error) {
      res.status(500).json({
        error: `Erreur lors de la mise à jour de l'utilisateur, ${error}`,
      });
    }
  } else {
    res.status(500).json({
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
  const id = parseInt(req.params.id, 10);
  const userId = req.user.id;

  const userAllowed = checkUserPersimission(userId, id);

  if (userAllowed) {
    try {
      const user = await deleteUser(id);

      if (!user) {
        return res
          .status(400)
          .json({ error: `L'utilisateur ${id} n'existe pas` });
      }
      const login = user.login;

      res.status(200).json(`The user ${login} has been successfully deleted`);
    } catch (error) {
      res.status(500).json({
        error: `Error when deleting user, ${error}`,
      });
    }
  } else {
    res.status(500).json({
      error: `You don't have the rights`,
    });
  }
};

module.exports = { findById, findByLogin, updateUser, removeUser };
