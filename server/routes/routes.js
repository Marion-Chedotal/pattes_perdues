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
 * authentication routes
 */
router.post("/register", AuthController.register);
router.post("/login", AuthController.login);

/**
 * user routes
 */
router.get("/user/:id", AuthMiddleware.validateToken, UserController.findById);
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
 * post routes
 */
router.post(
  "/post",
  AuthMiddleware.validateToken,
  upload,
  PostController.createPost
);

router.get("/post/:id", PostController.findById);
router.get("/posts", PostController.findAll);
router.get("/posts/last-three", PostController.findLastThreePosts);
router.get(
  "/posts/last-three-archives",
  PostController.findLastThreeArchivesPosts
);
router.get("/posts/archives", PostController.findAllArchivesPosts);
router.get(
  "/posts/user/:login",
  AuthMiddleware.validateToken,
  PostController.findByUser
);
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
 * type routes
 */
router.get("/type", TypeController.findAllType);

/**
 * pet category routes
 */
router.get("/petCategory", PetCategoryController.findAllPetCategory);

/**
 * message routes
 */
router.post(
  "/conversation/:id/message",
  AuthMiddleware.validateToken,
  MessageController.createMessage
);
router.get(
  "/conversation/last-messages",
  AuthMiddleware.validateToken,
  MessageController.findLastMessage
);

router.get(
  "/conversation/:userId/unreadMessages",
  AuthMiddleware.validateToken,
  MessageController.hasUnreadMessages
);

/**
 * conversation routes
 */
router.post(
  "/conversation/:receiverId",
  AuthMiddleware.validateToken,
  ConversationController.startConversation
);
router.get(
  "/conversations/user/:login",
  AuthMiddleware.validateToken,
  ConversationController.findConversations
);
router.get(
  "/conversation/:login/:id",
  AuthMiddleware.validateToken,
  ConversationController.findConversation
);

module.exports = router;
