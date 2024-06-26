const { User } = require("../models");

/** check if the email is already used
 * @param {string} email
 * @returns { Promise<object> }
 */
const checkEmailExists = async (email) => {
  return await User.findOne({ where: { email: email } });
};

/** check if the login is already used
 * @param {string} login
 * @returns { Promise<object> }
 */
const checkLoginExists = async (login) => {
  return await User.findOne({ where: { login: login } });
};

/**
 * Create a new user
 * @param {Object} userData - data of the user
 * @returns {Promise<Object>}
 */

const registerUser = (userData) => User.create(userData);

/**
 * Find user by login
 * @param {string} login
 * @returns {Promise<Object>}
 */
const getByLogin = async (login) => {
  return await User.findOne({
    where: {
      login,
    },
  });
};

/**
 * Find user by his id
 * @param {number} id
 * @returns {Promise<Object>}
 */
const getById = (id) =>
  User.findByPk(id, {
    attributes: { exclude: ["password"] },
    //email need for profil
  });

/**
 * Update user
 * @param {number} idUser
 * @param {object} data
 * @returns {Promise<Object>}
 */
const editUser = async (idUser, data) => {
  return await User.update(data, {
    where: {
      id: idUser,
    },
  });
};

/**
 * Delete user
 * @param {number} id
 * @returns {Promise}
 */
const deleteUser = async (id) => {
  const user = await getById(id);

  if (!user) {
    throw new Error("User does not exist");
  }
  return user.destroy();
};

module.exports = {
  checkEmailExists,
  checkLoginExists,
  registerUser,
  getByLogin,
  getById,
  editUser,
  deleteUser,
};
