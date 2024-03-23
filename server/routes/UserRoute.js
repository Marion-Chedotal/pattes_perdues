const express = require("express");
const router = express.Router();
const { validateToken } = require("../middleware/AuthMiddleware");
const AuthController = require("../controllers/AuthentificationController");
const AuthPolicy = require("../middleware/AuthPolicyMiddleware");

router.post("/", AuthPolicy.register, AuthController.register);
router.post("/login", AuthController.login);
router.get("/profile", validateToken, (req, res) => {
  res.json("profile");
});
// router.post("/", AuthPolicy, AuthController.update);
// router.get("/auth", valideToken, AuthController.isUserAuthentify);

module.exports = router;
