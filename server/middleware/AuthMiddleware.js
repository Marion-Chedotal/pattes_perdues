const { sign, verify } = require("jsonwebtoken");

const createToken = (user) => {
  const accessToken = sign(
    { login: user.login, id: user.id },
    process.env.JWT_SECRET,
    { expiresIn: "2h" }
  );

  return accessToken;
};

const validateToken = (req, res, next) => {
  const accessToken = req.cookies["access-token"];

  if (!accessToken) {
    return res.status(403).json({ error: "Utilisateur non-authentifié! " });
  }

  try {
    const validToken = verify(accessToken, process.env.JWT_SECRET);
    req.user = validToken;
    if (validToken) {
      return next();
    }
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};

module.exports = { createToken, validateToken };
