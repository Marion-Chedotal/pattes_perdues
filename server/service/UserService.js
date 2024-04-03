const { User, Address} = require("../models");

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
  });
};

/**
 * Find user by his id and get his address
 * @param {string} id
 * @returns {Promise<Object>}
 */
const getById = async (id) => {
  return await User.findByPk(id, { 
    include: {
    model: Address,
    attributes: ['street', 'postalCode', 'city']
  }});
};

/**
 * Update user
 * @param {string} id
 * @param {object} data
 * @returns {Promise<Object>}
 */
const updateUser = async (id, data) => {
  return await User.update(data, {
    where: {
      id,
    },
  });
};

/**
 * Delete user
 * @param {string} id
 * @returns {Promise<Object>}
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
  updateUser,
  deleteUser,
};
