const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthenticationController");
const UserController = require("../controllers/UserController");
const TypeController = require("../controllers/TypeController");
const PetCategoryController = require("../controllers/PetCategoryController");
const PostController = require("../controllers/PostController");
const MessageController = require("../controllers/MessageController");
const ConversationController = require("../controllers/ConversationController");
const AuthMiddleware = require("../middleware/AuthMiddleware");
const upload = require("../utils/multerConfig");

/**
 * authentication route
 */
router.post("/register", AuthController.register);
router.post("/login", AuthController.login);

/**
 * user route
 */
router.get("/user/:id", AuthMiddleware.validateToken, UserController.findById);
// router.get(
//   "/user/search/:login",
//   AuthMiddleware.validateToken,
//   UserController.findByLogin
// );
router.put(
  "/user/:login",
  AuthMiddleware.validateToken,
  upload,
  UserController.updateUser
);
router.delete(
  "/user/:login",
  AuthMiddleware.validateToken,
  UserController.removeUser
);

/**
 * post route
 */
router.post(
  "/post",
  AuthMiddleware.validateToken,
  upload,
  PostController.createPost
);
router.get("/post/:id", PostController.findById);
router.get("/posts", PostController.findAll);
router.get("/posts/user/:login",  AuthMiddleware.validateToken,PostController.findByUser);
router.get(
  "/posts/:userId",
  AuthMiddleware.validateToken,
  PostController.numberPostsByUser
);
router.put(
  "/post/:id",
  AuthMiddleware.validateToken,
  upload,
  PostController.updatePost
);
router.delete(
  "/post/:id",
  AuthMiddleware.validateToken,
  PostController.removePost
);

/**
 * type route
 */
router.get("/type/:id", TypeController.findById);
router.get("/type", TypeController.findAllType);

/**
 * pet category route
 */
router.get("/petCategory/:id", PetCategoryController.findById);
router.get("/petCategory", PetCategoryController.findAllPetCategory);

/**
 * message route
 */
router.post(
  "/post/:id/contact",
  AuthMiddleware.validateToken,
  MessageController.createMessage
);

/**
 * conversation route
 */
router.get(
  "/user/:userId/conversations",
  AuthMiddleware.validateToken,
  ConversationController.findConversations
);
router.get(
  "/user/:userId/conversation/:id",
  AuthMiddleware.validateToken,
  ConversationController.findConversation
);

module.exports = router;
