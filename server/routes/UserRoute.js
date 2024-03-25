const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthenticationController");
const UserController = require("../controllers/UserController");
const AuthMiddleware = require("../middleware/AuthMiddleware");

// authentication route
router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.get("/logout", AuthController.logout);

// user route
router.get("/user/:id", AuthMiddleware.validateToken, UserController.findById);
router.get("/user/search/:login", AuthMiddleware.validateToken, UserController.findByLogin);
router.put("/user/:id", AuthMiddleware.validateToken, UserController.update);
router.delete("/user/:id", AuthMiddleware.validateToken, UserController.remove);

module.exports = router;
