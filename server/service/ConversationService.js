const { Conversation, Message, User, Post } = require("../models");
const db = require("../models");
const UserService = require("../service/UserService");

const sequelize = db.sequelize;

const { Op } = require("sequelize");

/**
 * Create a new conversation
 * @returns {Promise<Object>}
 */
const addConversation = async () => {
  return await Conversation.create();
};

/**
 * Get all conversations by User and retrieve login partner conversation
 * @param {number} idSender
 * @param {number} idReceiver
 * @returns {Promise<Object[]>}
 */
const getAllConversationsByUser = async (userId) => {
  try {
    const user = await UserService.getById(userId);
    const userLogin = user.login;

    const sqlQuery = `
      SELECT DISTINCT
          c.*,
          p.*,
          u1.login, u1.id, u1.avatar,
          u2.login, u2.id, u2.avatar,
          m.*,
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
      INNER JOIN
          Post p ON p.id = c.PostId
      WHERE
          u1.id = ${userId} OR u2.id = ${userId}
      GROUP BY m.receiverId 
    `;
    return await sequelize.query(sqlQuery, {
      type: sequelize.QueryTypes.SELECT,
    });
  } catch (error) {
    console.error("Error fetching conversations:", error);
    throw error;
  }
};

/**
 * Get one conversation and its associated messages
 * @param {number} idUser
 * @param {number} idConversation
 * @returns {Promise<Object>}
 */
const getConversation = async (idUser, idConversation) => {
  return await Conversation.findOne({
    where: { id: idConversation },
    include: [
      {
        model: Message,
        where: {
          [Op.or]: [{ UserId: idUser }, { receiverId: idUser }],
        },
        include: [
          {
            model: User,
            attributes: ["login", "avatar"],
            as: "Receiver",
          },
          {
            model: User,
            attributes: ["login", "avatar"],
            as: "Sender",
          },
        ],
      },
      {
        model: Post,
        attributes: ["name"],
      },
    ],
  });
};

module.exports = {
  addConversation,
  getAllConversationsByUser,
  getConversation,
};
