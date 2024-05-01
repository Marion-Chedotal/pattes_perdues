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
  let { content, receiverId } = req.body;
  const idPost = parseInt(req.params.id, 10);

  const post = await PostService.getById(idPost);
  const postUserId = post.UserId;
  const senderId = req.user.id;

  // TODO: p-e revoir like PostController si pb
  req.body.receiverId = post.UserId;
  req.body.UserId = senderId;

  const correctReceiver = await PostService.isCorrectAddressee(
    postUserId,
    receiverId
  );

  // sanitize input
  content = escapeHtml(content);
  const isConversationExist = await MessageService.isConversationExist(
    senderId,
    receiverId
  );

  if (correctReceiver) {
    if (!isConversationExist) {
      if (senderId != receiverId) {
        const newConversation = await ConversationService.addConversation();

        req.body.ConversationId = newConversation.id;
        await MessageService.addMessage(req.body);

        res.status(201).json(`Your message has been successfully transmitted`);
      } else {
        res.status(500).json({
          error: `You can't send you a message`,
        });
      }
    } else {
      req.body.ConversationId = isConversationExist.ConversationId;
      try {
        await MessageService.addMessage(req.body);

        res.status(201).json(`Your message has been successfully transmitted`);
      } catch (error) {
        console.error(error);
        res.status(500).json({
          error: `Error when transmitted message, ${error}`,
        });
      }
    }
  } else {
    res.status(500).json({
      error: `You can't send a message`,
    });
  }
};

module.exports = { createMessage };
