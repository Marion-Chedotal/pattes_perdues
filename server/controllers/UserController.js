const { User } = require("../models");

/**
 * Get user by his id
 * @param {object} req 
 * @param {object} res
 * @returns {object} user's data
 * @throws {object} error
 */
const getById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id, {
        attributes: { exclude: ['password'] } 
    });
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
const getByLogin = async (req, res) => {
  const { login } = req.params;
  try {
    const user = await User.findOne({
      where: {
        login,
      },
      attributes: { exclude: ['password'] } 
    });
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
  const { id } = req.params;
  const data = req.body;

  try {
    const user = await User.update(data, {
      where: {
        id,
      },
    });

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
};

/**
 * Delete a user
 * @param {object} req
 * @param {object} res
 * @returns {string} string success
 * @throws {object} Error
 */
const deleteUser = async (req, res) => {
  const { id } = req.params;
  // TODO: compare id received / id => TODO middleware / service 
  try {
    const user = await User.findOne({
      where: {
        id,
      },
    });

    const login = user.login;

    if (!user) {
      return res
        .status(400)
        .json({ error: `L'utilisateur ${id} n'existe pas` });
    }

    await User.destroy({
      where: {
        id,
      },
    });
    res.status(200).json(`L'utilisateur ${login} a bien été supprimé`);
  } catch (error) {
    res.status(500).json({
      error: `Erreur lors de la suppression de l'utilisateur, ${error}`,
    });
  }
};

module.exports = { getById, getByLogin, updateUser, deleteUser };
