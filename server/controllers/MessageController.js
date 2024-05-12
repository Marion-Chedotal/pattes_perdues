const MessageService = require("../service/MessageService");
const ConversationService = require("../service/ConversationService");
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
  // sanitize input
  req.body.content = escapeHtml(req.body.content);

  // Check input format
  const { error } = validateMessageInput(req.body);
  if (error) {
    return res.status(400).json({
      errorCode: "fieldsToFill",
      errorMessage: errors.global.fieldsToFill,
    });
  }

  // UserId = senderId
  let { content, UserId, receiverId, ConversationId } = req.body;

  try {
    await MessageService.addMessage(req.body);

    const conversation = await ConversationService.getConversation(
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

module.exports = { createMessage };
