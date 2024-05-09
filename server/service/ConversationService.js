const { Conversation, Message, User } = require("../models");
const db = require("../models"); // Assurez-vous d'importer correctement votre fichier de configuration Sequelize
const UserService = require("../service/UserService");

// Obtenez l'instance Sequelize
const sequelize = db.sequelize;

const { Op } = require("sequelize");

/**
 * Create a new conversation
 * @returns {Promise<Object>}
 */
const addConversation = async () => {
  return await Conversation.create();
}

/**
 * Get all conversations by User and retrieve login partner conversation
 * @param {number} idSender
 * @param {number} idReceiver
 * @returns {Promise<Object[]>}
 */
const getAllConversationsByUser = async  (userId) => {
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
          Conversation c
      INNER JOIN
          Message m ON c.id = m.ConversationId
      INNER JOIN
          User u1 ON m.UserId = u1.id
      INNER JOIN
          User u2 ON m.receiverId = u2.id
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
const getConversation =  async (idUser, idConversation) => {
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

module.exports = {addConversation, getAllConversationsByUser, getConversation};
