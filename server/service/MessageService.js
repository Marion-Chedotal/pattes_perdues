const { Message } = require("../models");
const { Op } = require("sequelize");

class MessageService {
  /**
   * Create a new message
   * @param {Object} data - data of the message
   * @returns {Promise<Object>}
   */
  static async addMessage(data) {
    return await Message.create(data);
  }

  /**
   * Check is conversation existe between 2 users
   * @param {number} idSender - id of the sender
   * @param {number} idReceiver - id of the receiver
   * @returns {boolean}
   */
  static async isConversationExist(idSender, idReceiver) {
    const conversation = await Message.findOne({
      where: {
        [Op.or]: [
          { UserId: idSender, receiverId: idReceiver },
          { UserId: idReceiver, receiverId: idSender },
        ],
      },
    });
    return !!conversation;
  }
}

module.exports = MessageService;