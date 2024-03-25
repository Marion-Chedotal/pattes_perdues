const { User } = require("../models");
const { sign } = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

/** check if the email is already used
 * @param {string} email
 * @returns { boolean }
 */
const checkEmailExists = async (email) => {
  return await User.findOne({ where: { email: email } });
};

/** check if the login is already used
 * @param {string} login
 * @returns { boolean }
 */
const checkLoginExists = async (login) => {
  return await User.findOne({ where: { login: login } });
};

/**
 * Create JWT access token for an user
 * @param {object} user
 * @returns {string } JWT
 */
const createToken = (user) => {
  const accessToken = sign(
    { login: user.login, id: user.id },
    process.env.JWT_SECRET,
    { expiresIn: "2h" }
  );

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

module.exports = { checkEmailExists, checkLoginExists, createToken, comparePasswords };
