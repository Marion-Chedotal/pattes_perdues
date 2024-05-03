const { verify } = require("jsonwebtoken");

/**
 * JWT validator
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @returns {void}
 */
const validateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const accessToken = authHeader?.split(" ")[1];
  try {
    const validToken = verify(accessToken, process.env.JWT_SECRET);

    req.userId = validToken.id;
    req.token = accessToken;

    if (validToken) {
      return next();
    } else {
      res.status(403).json({
        error:
          "Access denied: You are not authorised to access this resource. ",
      });
    }
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "JWT is expired" });
    }
    return res.status(500).json({ message: error });
  }
};

module.exports = { validateToken };
