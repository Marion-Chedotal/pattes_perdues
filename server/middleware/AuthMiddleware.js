const { sign, verify } = require("jsonwebtoken");


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
 * JWT validator
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @returns {void}
 */
const validateToken = (req, res, next) => {
  const accessToken = req.cookies["access-token"];

  if (!accessToken) {
    return res.status(401).json({ error: "Utilisateur non-authentifié! " });
  }

  try {
    const validToken = verify(accessToken, process.env.JWT_SECRET);
    req.user = validToken;
    if (validToken) {
      return next();
    }
    // TODO:  else 403
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

module.exports = { createToken, validateToken };
