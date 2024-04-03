const {
  getByLogin,
  getById,
  updateUser,
  deleteUser,
} = require("../service/UserService");
const { checkUserPersimission } = require("../service/AuthenticationService");
const bcrypt = require("bcryptjs");

/**
 * Get user by his id
 * @param {object} req
 * @param {object} res
 * @returns {object} user's data
 * @throws {object} error
 */
const findById = async (req, res) => {
  const { id } = parseInt(req.params, 10);
  try {
    const user = await getById(id);

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
const update = async (req, res) => {
  const { id } = parseInt(req.params, 10);
  const userId = req.user.id;
  const data = req.body;

  const userAllowed = checkUserPersimission(userId, id);

  if (userAllowed) {
    try {
      if (data.password) {
        const hashPassword = await bcrypt.hash(data.password, 10);
        data.password = hashPassword;
      }

      const user = await updateUser(id, data);

      if (!user) {
        return res
          .status(400)
          .json({ error: `L'utilisateur ${id} n'existe pas` });
      }
      res.status(200).json(`L'utilisateur ${data.login} a bien été mis à jour`);
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
const remove = async (req, res) => {
  const { id } = parseInt(req.params, 10);
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

module.exports = { findById, findByLogin, update, remove };
