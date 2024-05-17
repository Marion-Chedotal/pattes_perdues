const conversationService = require("../service/conversationService");
const userService = require("../service/userService");
const authenticationService = require("../service/authenticationService");
const messageService = require("../service/messageService");
const { escapeHtml } = require("../utils/htmlEscape");
const errors = require("../utils/errors.json");
const Joi = require("joi");

/**
 * Validate message input using a Joi schema.
 * @param {object} data - The data to be validated.
 * @param {string} data.content - content of message
 * @param {string} data.senderId - id of the current user.
 * @param {string} data.receiverId - id of the receiver
 * @param {number} data.Conversationid - id of the conversation
 * @returns {Joi.ValidationResult<object>} - The result of the validation.
 */
const validateInput = (data) => {
  const schema = Joi.object({
    content: Joi.string(),
    senderId: Joi.number(),
    receiverId: Joi.number(),
    PostId: Joi.number(),
    read: Joi.boolean(),
  });

  return schema.validate(data);
};
/**
 * Create a conversation
 * @param {object} req
 * @param {object} res
 * @returns {string} string success
 * @throws {object} error
 */
const startConversation = async (req, res) => {
  // Check input format
  const { error } = validateInput(req.body);
  if (error) {
    return res.status(400).json({
      errorCode: "fieldsToFill",
      errorMessage: errors.global.fieldsToFill,
    });
  }

  // sanitize input
  req.body.content = escapeHtml(req.body.content);

  let { content, senderId, receiverId, PostId } = req.body;

  const existingConversation = await conversationService.doesConversationExist(
    PostId,
    senderId,
    receiverId
  );

  if (existingConversation) {
    return res.status(409).json({
      errorCode: "conversationExist",
      errorMessage: errors.conversation.conversationExist,
    });
  }

  if (senderId != receiverId) {
    try {
      // create a new conversation
      const conversation = await conversationService.addConversation({
        PostId,
      });

      const messageData = {
        content: content,
        UserId: senderId,
        receiverId: receiverId,
        ConversationId: conversation.id,
        read: false,
      };

      await messageService.addMessage(messageData);

      res.status(201).json(conversation);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: `Error when creating conversation, ${error}`,
      });
    }
  } else {
    res.status(500).json({
      error: `You can't send you a message`,
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
  const user = await userService.getByLogin(login);
  const userId = user.id;
  const currentUserId = req.userId;

  const isUserAllowed = authenticationService.checkUserPermission(
    currentUserId,
    userId
  );

  if (!isUserAllowed) {
    res.status(403).json({
      error: `You don't have the rights`,
    });
  }

  try {
    const conversation = await conversationService.getConversation(
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
  const user = await userService.getByLogin(login);
  const userId = user.id;
  const currentUserId = req.userId;

  const isUserAllowed = authenticationService.checkUserPermission(
    currentUserId,
    userId
  );

  if (!isUserAllowed) {
    res.status(403).json({
      error: `You don't have the rights`,
    });
  }
  try {
    const conversations = await conversationService.getAllConversationsByUser(
      userId
    );

    res.status(201).json(conversations);
  } catch (error) {
    res.status(500).json({
      error: `Error when fetching conversations, ${error}`,
    });
    findConversations;
  }
};

module.exports = { startConversation, findConversation, findConversations };
