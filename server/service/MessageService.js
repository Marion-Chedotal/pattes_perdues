const { Message } = require("../models");

/**
 * Create a new message
 * @param {Object} data - data of the message
 * @returns {Promise<Object>}
 */
const addMessage = async (data) => {
  return await Message.create(data);
}

module.exports = {addMessage};
