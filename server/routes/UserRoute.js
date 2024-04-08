const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthenticationController");
const UserController = require("../controllers/UserController");
const TypeController = require("../controllers/TypeController");
const PetCategoryController = require("../controllers/PetCategoryController");
const PostController = require("../controllers/PostController");
const MessageController = require("../controllers/MessageController");
const ConversationController = require("../controllers/ConversationController");
const AddressController = require("../controllers/AddressController");
const AuthMiddleware = require("../middleware/AuthMiddleware");

// authentication route
router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.get("/logout", AuthController.logout);

// user route
router.get("/user/:id", AuthMiddleware.validateToken, UserController.findById);
router.get(
  "/user/search/:login",
  AuthMiddleware.validateToken,
  UserController.findByLogin
);
router.put(
  "/user/:id",
  AuthMiddleware.validateToken,
  UserController.updateUser
);
router.delete(
  "/user/:id",
  AuthMiddleware.validateToken,
  UserController.removeUser
);

// TODO: to refacto - just for test
// type route
router.get("/type/:id", TypeController.findById);
router.get("/type", TypeController.findAllType);

// pet category route
router.get("/petCategory/:id", PetCategoryController.findById);
router.get("/petCategory", PetCategoryController.findAllPetCategory);

// post route
router.post("/post", AuthMiddleware.validateToken, PostController.createPost);
router.get("/post/:id", PostController.findById);
router.get("/posts/", PostController.findAll);
router.get("/post/user/:id", PostController.findByUser);
router.get("/post/address/:postalCode", PostController.findByAddress);
// router.get("/post/type/:id", PostController.findByType);
// router.get("/post/petCategory/:id", PostController.findByPetCategory);
router.put(
  "/post/:id",
  AuthMiddleware.validateToken,
  PostController.updatePost
);
router.delete(
  "/post/:id",
  AuthMiddleware.validateToken,
  PostController.removePost
);

// message route
router.post(
  "/post/:id/contact",
  AuthMiddleware.validateToken,
  MessageController.createMessage
);
// router.get("/user/:id/message/", AuthMiddleware.validateToken, MessageController.findAll);

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
