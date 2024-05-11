const MessageService = require("../service/MessageService");
const ConversationService = require("../service/ConversationService");
const PostService = require("../service/PostService");
const { escapeHtml } = require("../utils/htmlEscape");

/**
 * Create a new message
 * @param {object} req
 * @param {object} res
 * @returns {string} string success
 * @throws {object} error
 */
const createMessage = async (req, res) => {
  let { content, id_sender, id_receiver, id_conversation } = req.body;

  // sanitize input
  content = escapeHtml(content);
  const doesConversationExist = await MessageService.doesConversationExist(
    id_sender,
    id_receiver
  );

  if (!doesConversationExist) {
    if (id_sender != id_receiver) {
      const newConversation = await ConversationService.addConversation();

      req.body.id_conversation = newConversation.id;
      await MessageService.addMessage(req.body);

      res.status(201).json(`Your message has been successfully transmitted`);
    } else {
      res.status(500).json({
        error: `You can't send you a message`,
      });
    }
  } else {
    try {
      const data = {
        content,
        id_sender,
        id_receiver,
        id_conversation
      }
      await MessageService.addMessage(data);

      const conversation = await ConversationService.getConversation(
        id_sender,
        id_conversation
      );

      res.status(201).json(conversation);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: `Error when transmitted message, ${error}`,
      });
    }
  }
};

module.exports = { createMessage };
