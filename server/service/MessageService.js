const { Message } = require("../models");

/**
 * Create a new message
 * @param {Object} data - data of the message
 * @returns {Promise<Object>}
 */
const addMessage = async (data) => {
  return await Message.create(data);
};

/**
 * Change the read fields to true when message is read
 * @param {Object} messageId -
 * @returns {Promise<Object>}
 */
const passMessageToRead = async (messageId) => {
  return await Message.update({ read: true }, { where: { id: messageId } });
};

/**
 * Know if user have unread messages
 * @param {Object} userId - id of the user
 * @returns {Promise<Object>}
 */
const unreadMessages = async (userId) => {
  return await Message.count({ where: { receiverId: userId, read: false } });
};

module.exports = { addMessage, passMessageToRead, unreadMessages };
