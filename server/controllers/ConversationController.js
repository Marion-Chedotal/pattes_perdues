const ConversationService = require("../service/ConversationService");
const UserService = require("../service/UserService");
const AuthenticationService = require("../service/AuthenticationService");
const MessageService = require("../service/MessageService");

/**
 * Create a conversation
 * @param {object} req
 * @param {object} res
 * @returns {string} string success
 * @throws {object} error
 */
const startConversation = async (req, res) => {
  try {
    let {
      content,
      senderId,
      receiverId,
      PostId,
    } = req.body;

    // create a new post
    const conversation = await ConversationService.addConversation({
      PostId,
    });

    const messageData = {
      content: content,
      UserId: senderId,
      receiverId: receiverId,
      ConversationId: conversation.id
    }

    const message = await MessageService.addMessage(
      messageData
    );

    res.status(201).json(`Conversation created`);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: `Error when creating conversation, ${error}`,
    });
  }
};

/**
 * Find a conversation
 * @param {object} req
 * @param {object} res
 * @returns {string} string success
 * @throws {object} error
 */
const findConversation = async (req, res) => {
  const idConversation = parseInt(req.params.id, 10);
  const login = req.params.login;
  const user = await UserService.getByLogin(login);
  const userId = user.id;
  const currentUserId = req.userId;

  const isUserAllowed = AuthenticationService.checkUserPermission(
    currentUserId,
    userId
  );

  if (isUserAllowed) {
    try {
      const conversation = await ConversationService.getConversation(
        userId,
        idConversation
      );

      await res.status(201).json(conversation);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: `Error when fetching conversation, ${error}`,
      });
    }
  } else {
    res.status(403).json({
      error: `You don't have the rights`,
    });
  }
};

/**
 * Get all conversations for a user
 * @param {object} req
 * @param {object} res
 * @returns {string} string success
 * @throws {object} error
 */
const findConversations = async (req, res) => {
  const login = req.params.login;
  const user = await UserService.getByLogin(login);
  const userId = user.id;
  const currentUserId = req.userId;

  const isUserAllowed = AuthenticationService.checkUserPermission(
    currentUserId,
    userId
  );

  if (isUserAllowed) {
    try {
      const conversations = await ConversationService.getAllConversationsByUser(
        userId
      );

      res.status(201).json(conversations);
    } catch (error) {
      res.status(500).json({
        error: `Error when fetching conversations, ${error}`,
      });
      findConversations;
    }
  } else {
    res.status(403).json({
      error: `You don't have the rights`,
    });
  }
};

module.exports = { startConversation, findConversation, findConversations};
