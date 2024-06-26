const { Message } = require("../models");

/**
 * Create a new message
 * @param {Object} data - data of the message
 * @returns {Promise<Object>}
 */
const addMessage = (data) => Message.create(data);

/**
 * Change the read fields to true when interlocutor message is read
 * @param {Object} messageId -
 * @returns {Promise<Object>}
 */
const passMessageToRead = async (messageId, currentUserId) => {
  const message = await Message.findByPk(messageId);

  if (message && message.UserId !== currentUserId) {
    return await Message.update({ read: true }, { where: { id: messageId } });
  }
};

/**
 * Know if user have unread messages
 * @param {Object} userId - id of the user
 * @returns {Promise<Object>}
 */
const unreadMessages = async (userId) => {
  return await Message.count({
    where: { receiverId: userId, read: false },
  });
};

/**
 * Get the latest message of a conversation
 * @param {Object} idConversation - id of the conversation
 * @returns {Promise<Object>}
 */

const getLastMessageForConversation = async (conversationId) => {
  try {
    const message = await Message.findOne({
      where: { ConversationId: conversationId },
      order: [["createdAt", "DESC"]],
      limit: 1,
      attributes: { exclude: ["createdAt", "content"] },
    });
    return message;
  } catch (error) {
    throw new Error("Error fetching last message for conversation");
  }
};

const getLastMessagesForConversations = async (conversationIdArray) => {
  try {
    const lastMessages = await Promise.all(
      conversationIdArray.map(async (id) => {
        return await getLastMessageForConversation(id);
      })
    );
    return lastMessages;
  } catch (error) {
    throw new Error("Error fetching last messages for conversations");
  }
};

module.exports = {
  addMessage,
  passMessageToRead,
  unreadMessages,
  getLastMessagesForConversations,
};
