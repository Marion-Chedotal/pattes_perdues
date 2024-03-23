const { User } = require("../models");
const bcrypt = require("bcryptjs");
const { escapeHtml } = require("../utils/htmlEscape");
const { createToken } = require("../middleware/AuthMiddleware.js");

const register = async (req, res) => {
  try {
    // Get user input
    const { login, password, email, avatar } = req.body;

    // sanitize input
    login.trim();
    password.trim();
    email.trim();

    login = escapeHtml(login);
    email = escapeHtml(email);

    if (!(login && password && email)) {
      return res.status(400).json("Merci de remplir tous les champs");
    }

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

    return res.status(201).json(`L'utilisateur ${login} a bien été créé`);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: `Erreur de l'enregistrement de l'utilisateur, ${error}`,
    });
  }
};

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
        sameSite: true,
      });

      res.status(200).json({
        token: accessToken,
        login: login,
        id: user.id,
      });
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users." });
  }
};

const isUserAuthentify = async (req, res) => {
  res.json(req.user);
};

module.exports = { register, login, isUserAuthentify };
