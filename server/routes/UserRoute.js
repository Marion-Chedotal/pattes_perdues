const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthentificationController");
const UserController = require("../controllers/UserController");
const AuthMiddleware = require("../middleware/AuthMiddleware");
const AuthPolicy = require("../middleware/AuthPolicyMiddleware");

// authentification route
router.post("/", AuthPolicy.register, AuthController.register);
router.post("/login", AuthController.login);
router.get("/logout", AuthController.logout);

// user route
router.get("/user/:id", AuthMiddleware.validateToken, UserController.getById);
router.get("/user/search/:login", AuthMiddleware.validateToken, UserController.getByLogin);
router.put("/user/:id", AuthMiddleware.validateToken, UserController.updateUser);
router.delete("/user/:id", AuthMiddleware.validateToken, UserController.deleteUser);

module.exports = router;
