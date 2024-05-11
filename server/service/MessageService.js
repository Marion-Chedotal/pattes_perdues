const { Message } = require("../models");
const { Op } = require("sequelize");

/**
 * Create a new message
 * @param {Object} data - data of the message
 * @returns {Promise<Object>}
 */
const addMessage = async (data) => {
  return await Message.create(data);
};

/**
 * Check is conversation existe between 2 users
 * @param {number} id_sender - id of the sender
 * @param {number} id_receiver - id of the receiver
 * @returns {boolean}
 */
const doesConversationExist = async (id_sender, id_receiver) => {
  const conversation = await Message.findOne({
    where: {
      [Op.or]: [
        { id_sender, receiverId },
        { id_receiver, id_sender },
      ],
    },
  });
  return !!conversation;
};

module.exports = { addMessage, doesConversationExist };
