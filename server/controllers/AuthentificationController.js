const { User } = require("../models");
const bcrypt = require("bcryptjs");
const { escapeHtml } = require("../utils/htmlEscape");
const { createToken } = require("../middleware/AuthMiddleware.js");

/**
 * Register a new user
 * @param {object} req
 * @param {object} res
 * @returns {string} string success
 * @throws {object} error
 */
const register = async (req, res) => {
  try {
    //TODO: policy here 
    // Get user input
    let { login, password, email, avatar } = req.body;

    // sanitize input
    login.trim();
    password.trim();
    email.trim();

    login = escapeHtml(login);
    email = escapeHtml(email);

    // Check if user already exist: same email
    const isEmailAlreadyExist = await User.findOne({ where: { email: email } });
    if (isEmailAlreadyExist) {
      return res.status(400).json("Un utilisateur avec cet e-mail existe déjà");
    }

    // Check if user already exist: same login
    const isLoginAlreadyExist = await User.findOne({ where: { login: login } });
    if (isLoginAlreadyExist) {
      return res.status(400).json("Ce nom d'utilisateur est déjà pris");
    }

    // Encrypt user password
    const hashPassword = await bcrypt.hash(password, 10);

    // Create new user
    await User.create({
      login: login,
      password: hashPassword,
      email: email,
      avatar: avatar,
    });

    res.status(201).json(`L'utilisateur ${login} a bien été créé`);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: `Erreur de l'enregistrement de l'utilisateur, ${error}`,
    });
  }
};

/**
 * Log a user
 * @param {object} req
 * @param {object} res
 * @returns {object} object of accessTokenUser, idUser and login
 * @throws {object} Error
 */
const login = async (req, res) => {
  try {
    const { login, password } = req.body;

    // sanitize input
    login.trim();
    password.trim();

    if (!(login && password)) {
      return res.status(400).json("Merci de remplir tous les champs");
    }

    const user = await User.findOne({ where: { login: login } });

    if (!user) {
      return res.status(404).json({ error: "L'utilisateur n'existe pas" });
    }

    const dbPassword = user.password;
    bcrypt.compare(password, dbPassword).then((match) => {
      if (!match) {
        return res.status(401).json({ error: "Mot de passe incorrect" });
      }

      const accessToken = createToken(user);

      res.cookie("access-token", accessToken, {
        maxAge: 2 * 60 * 60 * 1000,
        httpOnly: true,
        // sameSite: true,
      });

      res.status(200).json({
        token: accessToken,
        login: login,
        id: user.id,
      });
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: `Erreur lors de l'authentification: ${error}` });
  }
};

/**
 * Log out user by destroying his JWT
 * @param {object} req
 * @param {object} res
 * @returns {string} string success
 * @throws {object} error
 */
const logout = async (req, res) => {
  try {
    if (req.cookies["access-token"]) {
      res.clearCookie("access-token", {
        secure: true,
        samesite: "none",
      });
      return res.status(200).json({ message: "Vous avez bien été déconnecté" });
    } else {
      return res.status(400).json({ message: "Aucun cookie à supprimer" });
    }
  } catch (error) {
    res.status(500).json({ error: `Erreur lors de la déconnexion, ${error}` });
  }
};

module.exports = { register, login, logout };
