const { sign } = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

/**
 * Create JWT access token for a user
 * @param {string} login
 * @param {int} id
 * @returns {string } JWT
 */
const createToken = (login, id) => {
  const accessToken = sign({ login, id }, process.env.JWT_SECRET, {
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
const comparePasswords = async (password, dbPassword) => {
  return bcrypt.compare(password, dbPassword);
};

/**
 * Check if the user has permission to perform an action on a resource
 * @param {string} userId - ID of the user who is trying to perform the action
 * @param {string} requestedUserId - ID of the user associated with the resource
 * @returns {<boolean>} True if it's match
 */

const checkUserPersimission = (userId, requestedUserId) => {
  return userId === requestedUserId;
};

module.exports = { createToken, comparePasswords, checkUserPersimission };
