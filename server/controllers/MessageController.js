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
  let { content, senderId, receiverId, conversationId } = req.body;

  console.log('here');

  // sanitize input
  content = escapeHtml(content);
  const doesConversationExist = await MessageService.doesConversationExist(
    senderId,
    receiverId
  );
  console.log('doesConversationExist', doesConversationExist);

  if (!doesConversationExist) {
    if (senderId != receiverId) {
      const newConversation = await ConversationService.addConversation();

      console.log('not exists', newConversation);

      req.body.ConversationId = newConversation.id;
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
        content: content,
        UserId: senderId,
        receiverId: receiverId,
        ConversationId: conversationId
      }
      await MessageService.addMessage(data);

      const conversation = await ConversationService.getConversation(
        senderId,
        conversationId
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
