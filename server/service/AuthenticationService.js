const { sign } = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

  /**
 * Create JWT access token for a user
 * @param {string} login
 * @param {number} id_user
 * @returns {string } JWT
 */
const createToken = (login, id_user) => {
  const accessToken = sign({ login, id_user }, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });

  return accessToken;
};

/**
 * Compare two passwords .
 * @param {string} password - The password provided by the user.
 * @param {string} dbPassword - The hashed password stored in the database.
 * @returns {Promise<boolean>} True if the passwords match
 */
const comparePasswords = (password, dbPassword) => {
  return bcrypt.compare(password, dbPassword);
};

/**
 * Check if the user has permission to perform an action on a resource
 * @param {number} id_user - ID of the user who is trying to perform the action
 * @param {number} requested_id_user - ID of the user associated with the resource
 * @returns {<boolean>} True if it's match
 */

const checkUserPermission = (id_user, requested_id_user) => {
  return id_user === requested_id_user;
};


module.exports = {createToken, comparePasswords, checkUserPermission};
