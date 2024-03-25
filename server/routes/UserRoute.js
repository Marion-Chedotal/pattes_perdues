const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthentificationController");
const UserController = require("../controllers/UserController");
const { validateToken } = require("../middleware/AuthMiddleware");
const AuthPolicy = require("../middleware/AuthPolicyMiddleware");

// authentification route
router.post("/", AuthPolicy.register, AuthController.register);
router.post("/login", AuthController.login);
router.get("/logout", AuthController.logout);

// user route
router.get("/user/:id", validateToken.validateToken, UserController.getById);
router.get("/user/search/:login", validateToken.validateToken, UserController.getByLogin);
router.put("/user/:id", validateToken.validateToken, UserController.updateUser);
router.delete("/user/:id", validateToken.validateToken, UserController.deleteUser);

module.exports = router;
