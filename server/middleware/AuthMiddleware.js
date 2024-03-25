const { verify } = require("jsonwebtoken");

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
    return res.status(401).json({ error: "User not authenticated! " });
  }

  try {
    const validToken = verify(accessToken, process.env.JWT_SECRET);
    req.user = validToken;

    if (validToken) {
      return next();
    } else {
      res.status(403).json({ error: "Access denied: You are not authorised to access this resource. "})
    }

  } catch (error) {
    res.status(500).json({ error: error });
  }
};

module.exports = { validateToken };
