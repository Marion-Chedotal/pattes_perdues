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
 * @param {number} id_sender
 * @param {number} id_receiver
 * @returns {Promise<Object[]>}
 */
const getAllConversationsByUser = async (id_user) => {
  try {
    const user = await UserService.getById(id_user);
    const userLogin = user.login;

    const sqlQuery = `
      SELECT DISTINCT
          c.*,
          p.*,
          u1.login, u1.id_sender, u1.avatar,
          u2.login, u2.id_receiver, u2.avatar,
          m.*,
          CASE
              WHEN u1.login != '${userLogin}' THEN u1.login
              ELSE u2.login
          END AS conversation_partner
      FROM
          Conversation c
      INNER JOIN
          Message m ON c.id_conversation = m.id_conversation
      INNER JOIN
          User u1 ON m.id_sender = u1.id_sender
      INNER JOIN
          User u2 ON m.id_receiver = u2.id_receiver
      INNER JOIN
          Post p ON p.id_post = c.id_post
      WHERE
          u1.id_sender = ${id_user} OR u2.id_sender = ${id_user}
      GROUP BY m.id_receiver 
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
 * @param {number} id_user
 * @param {number} id_conversation
 * @returns {Promise<Object>}
 */
const getConversation = async (id_user, id_conversation) => {
  return await Conversation.findOne({
    where: { id_conversation },
    include: [
      {
        model: Message,
        where: {
          [Op.or]: [{ id_sender: id_user }, { id_receiver: id_user }],
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
