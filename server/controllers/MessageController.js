const messageService = require("../service/messageService");
const conversationService = require("../service/conversationService");
const authenticationService = require("../service/authenticationService");
const { escapeHtml } = require("../utils/htmlEscape");
const errors = require("../utils/errors.json");
const Joi = require("joi");

/**
 * Validate message input using a Joi schema.
 * @param {object} data - The data to be validated.
 * @param {string} data.email - email
 * @param {string} data.password - password.
 * @param {string} data.login - login.
 * @param {number} data.postalCode - postal code .
 * @param {string} data.city - city.
 * @returns {Joi.ValidationResult<object>} - The result of the validation.
 */
const validateMessageInput = (data) => {
  const schema = Joi.object({
    content: Joi.string(),
    UserId: Joi.number(),
    receiverId: Joi.number(),
    ConversationId: Joi.number(),
    Sender: Joi.object({
      avatar: Joi.string().allow(null, ""),
    }),
    createdAt: Joi.date(),
  });

  return schema.validate(data);
};

const validateParams = (data) => {
  const schema = Joi.object({
    messageId: Joi.number(),
  });

  return schema.validate(data);
};

/**
 * Create a new message
 * @param {object} req
 * @param {object} res
 * @returns {string} string success
 * @throws {object} error
 */
const createMessage = async (req, res) => {
  // Check input format
  const { error } = validateMessageInput(req.body);
  if (error) {
    return res.status(400).json({
      errorCode: "fieldsToFill",
      errorMessage: errors.global.fieldsToFill,
    });
  }
  // sanitize input
  req.body.content = escapeHtml(req.body.content);

  // UserId = senderId
  let { content, UserId, receiverId, ConversationId } = req.body;

  const currentUserId = req.userId;

  const isUserAllowed = authenticationService.checkUserPermission(
    currentUserId,
    UserId
  );

  if (!isUserAllowed) {
    return res.status(403).json({
      error: `You don't have the rights`,
    });
  }

  const messageData = { ...req.body, read: false };

  try {
    await messageService.addMessage(messageData);

    const conversation = await conversationService.getConversation(
      UserId,
      ConversationId
    );

    res.status(201).json(conversation);
  } catch (error) {
    res.status(500).json({
      error: `Error when transmitted message, ${error}`,
    });
  }
};

/**
 * Update read status to true when message is read
 * @param {object} req
 * @param {object} res
 * @returns {string} string success
 * @throws {object} error
 */
const markMessageAsRead = async (req, res) => {
  const { messageId } = req.params;

  const { error } = validateParams({messageId});
  if (error) {
    return res.status(400).json("Invalid request parameters");
  }

  const currentUserId = req.userId;

  try {
    await messageService.passMessageToRead(messageId, currentUserId);
    res.status(200).json();
  } catch (error) {
    res.status(500).json({ error: "Error marking message as read" });
  }
};

/**
 * Know if the user have unread messages
 * @param {object} req
 * @param {object} res
 * @returns {string} string success
 * @throws {object} error
 */
const hasUnreadMessages = async (req, res) => {
  const currentUserId = req.userId;

  try {
    const response = await messageService.unreadMessages(currentUserId);
    const hasUnread = response > 0;

    res.status(200).json(hasUnread);
  } catch (error) {
    res.status(500).json({ error: "Error checking for unread messages" });
  }
};

/**
 * Get the latest message
 * @param {object} req
 * @param {object} res
 * @returns {string} string success
 * @throws {object} error
 */
const findLastMessage = async (req, res) => {
  const { conversationIds } = req.query;
  const conversationIdArray = conversationIds
    .split(",")
    .map((id) => parseInt(id, 10));

  try {
    const lastMessages = await messageService.getLastMessagesForConversations(
      conversationIdArray
    );
    res.status(200).json(lastMessages);
  } catch (error) {
    res.status(500).json({ error: "Error fetching last messages" });
  }
};
module.exports = {
  createMessage,
  markMessageAsRead,
  hasUnreadMessages,
  findLastMessage,
};
