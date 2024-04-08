const { Conversation, Message, User } = require("../models");
const db = require("../models"); // Assurez-vous d'importer correctement votre fichier de configuration Sequelize
const UserService = require("../service/UserService");

// Obtenez l'instance Sequelize
const sequelize = db.sequelize;

const { Op } = require("sequelize");

class ConversationService {
  /**
   * Create a new conversation
   * @returns {Promise<Object>}
   */
  static async addConversation() {
    return await Conversation.create();
  }

  /**
   * Get all conversation by User and retrieve login partner conversation
   * @param {number} idSender
   * @param {number} idReceiver
   * @returns {Promise<Object[]>}
   */
  static async getAllConversationByUser(userId) {
    try {
        const user = await UserService.getById(userId);
        const userLogin = user.login;

        const sqlQuery = `
        SELECT DISTINCT
            c.*,
            CASE
                WHEN u1.login != '${userLogin}' THEN u1.login
                ELSE u2.login
            END AS conversation_partner
        FROM
            conversation c
        INNER JOIN
            message m ON c.id = m.ConversationId
        INNER JOIN
            user u1 ON m.UserId = u1.id
        INNER JOIN
            user u2 ON m.receiverId = u2.id
        WHERE
            u1.id = ${userId} OR u2.id = ${userId}
    `;
        return await sequelize.query(sqlQuery, { type: sequelize.QueryTypes.SELECT });
    } catch (error) {
        console.error("Error fetching conversations:", error);
        throw error;
    }
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
          },
        },
      ],
    });
  }
}

module.exports = ConversationService;
