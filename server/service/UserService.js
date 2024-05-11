const { User, Address } = require("../models");

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

const registerUser = async (userData) => {
  return await User.create(userData);
};

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
    include: {
      model: Address,
      attributes: ["street", "postalCode", "city"],
    },
  });
};

/**
 * Find user by his id and get his address
 * @param {number} id_user
 * @returns {Promise<Object>}
 */
const getById = async (id_user) => {
  return await User.findByPk(id_user, {
    attributes: { exclude: ["password"] },
    include: {
      model: Address,
      attributes: ["street", "postalCode", "city"],
    },
  });
};

/**
 * Update user
 * @param {number} id_user
 * @param {object} data
 * @returns {Promise<Object>}
 */
const editUser = async (id_user, data) => {
  return await User.update(data, {
    where: {
      id_user,
    },
  });
};

/**
 * Delete user
 * @param {number} id_user
 * @returns {Promise}
 */
const deleteUser = async (id_user) => {
  const user = await getById(id_user);

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
