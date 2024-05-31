const express = require("express");
const router = express.Router();
const authController = require("../controllers/authenticationController");
const userController = require("../controllers/userController");
const typeController = require("../controllers/typeController");
const petCategoryController = require("../controllers/petCategoryController");
const postController = require("../controllers/postController");
const messageController = require("../controllers/messageController");
const conversationController = require("../controllers/conversationController");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/multerConfig");

/**
 * authentication routes
 */
router.post("/register", authController.register);
router.post("/login", authController.login);

/**
 * user routes
 */
router.get("/user/:id", authMiddleware.validateToken, userController.findById);
router.get(
  "/users/:login",
  authMiddleware.validateToken,
  userController.findByLogin
);
router.put(
  "/user/:login",
  authMiddleware.validateToken,
  upload,
  userController.updateUser
);
router.delete(
  "/user/:login",
  authMiddleware.validateToken,
  userController.removeUser
);

/**
 * post routes
 */
router.post(
  "/post",
  authMiddleware.validateToken,
  upload,
  postController.createPost
);

router.get("/post/:id", postController.findById);
router.get("/posts", postController.findAll);
router.get("/posts/last-three", postController.findLastThreePosts);
router.get(
  "/posts/last-three-archives",
  postController.findLastThreeArchivesPosts
);
router.get("/posts/archives", postController.findAllArchivesPosts);
router.get(
  "/posts/user/:login",
  authMiddleware.validateToken,
  postController.findByUser
);
router.get(
  "/posts/:userId",
  authMiddleware.validateToken,
  postController.numberPostsByUser
);

router.put(
  "/post/:id",
  authMiddleware.validateToken,
  upload,
  postController.updatePost
);
router.delete(
  "/post/:id",
  authMiddleware.validateToken,
  postController.removePost
);

/**
 * type routes
 */
router.get("/type", typeController.findAllType);

/**
 * pet category routes
 */
router.get("/petCategory", petCategoryController.findAllPetCategory);

/**
 * message routes
 */
router.post(
  "/conversation/:id/message",
  authMiddleware.validateToken,
  messageController.createMessage
);
router.post(
  "/conversation/:messageId/mark-as-read",
  authMiddleware.validateToken,
  messageController.markMessageAsRead
);

router.get(
  "/conversation/last-messages",
  authMiddleware.validateToken,
  messageController.findLastMessage
);

router.get(
  "/conversation/:userId/unreadMessages",
  authMiddleware.validateToken,
  messageController.hasUnreadMessages
);

/**
 * conversation routes
 */
router.post(
  "/conversation/:receiverId",
  authMiddleware.validateToken,
  conversationController.startConversation
);
router.get(
  "/conversations/user/:login",
  authMiddleware.validateToken,
  conversationController.findConversations
);
router.get(
  "/conversation/:login/:id",
  authMiddleware.validateToken,
  conversationController.findConversation
);

module.exports = router;
