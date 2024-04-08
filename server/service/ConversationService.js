const { when } = require("joi");
const { Conversation, Message, User } = require("../models");

const { Op } = require("sequelize");

class ConversationService {
  /**
   * Create a new conversation
   * @returns {Promise<Object>}
   */
  static async addConversation() {
    return await Conversation.create();
  }
  // TODO: doesn't work as I want
  /**
   * Get all conversation by User
   * @param {number} idSender
   * @param {number} idReceiver
   * @returns {Promise<Object[]>}
   */
  static async getAllConversationByUser(userId) {
    return await Conversation.findAll({
    // const conversations = await Conversation.findAll({
      include: [
        {
          model: Message,
          where: {
            [Op.or]: [{ UserId: userId }, { receiverId: userId }],
          },
          include: [
            {
              model: User,
              attributes: ["id", "login"],
            },
          ],
        },
      ],
    });

    // Filtrer les informations pour ne conserver qu'une seule entrée par utilisateur
    // const formattedConversations = conversations.map(conversation => {
    //   const otherUsers = [];
    //   conversation.Messages.forEach(message => {
    //     if (message.UserId === userId) { // Si l'utilisateur est l'expéditeur
    //       otherUsers.push({ id: message.receiverId, login: message.User.login });
    //     } else { // Si l'utilisateur est le destinataire
    //       otherUsers.push({ id: message.UserId, login: message.User.login });
    //     }
    //   });
      
    //   // Supprimer les doublons
    //   const uniqueUsers = otherUsers.filter((user, index, self) =>
    //     index === self.findIndex(u => u.id === user.id)
    //   );

    //   return {
    //     id: conversation.id,
    //     createdAt: conversation.createdAt,
    //     updatedAt: conversation.updatedAt,
    //     Users: uniqueUsers,
    //   };
    // });

    // return formattedConversations;
  }

  /**
   * Get one conversation his associated messages
   * @param {number} idUser
   * @param {number} idConversation
   * @returns {Promise<Object>}
   */
  static async getConversation(idUser, idConversation) {
    return await Conversation.findOne({
      where: { id: idConversation },
      include: [
        {
          model: Message,
          where: {
            [Op.or]: [{ UserId: idUser }, { receiverId: idUser }],
          }
        }
      ]
    });

  }
}

module.exports = ConversationService;
