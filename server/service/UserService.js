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
    include: {
      model: Address,
      attributes: ["street", "postalCode", "city"],
    },
  });
};

/**
 * Find user by his id and get his address
 * @param {number} id
 * @returns {Promise<Object>}
 */
const getById = async (id) => {
  return await User.findByPk(id, {
    attributes: { exclude: ["password"] },
    include: {
      model: Address,
      attributes: ["street", "postalCode", "city"],
    },
  });
};

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
