const { Conversation, Message, User, Post } = require("../models");
const db = require("../models");
const userService = require("./userService");

const sequelize = db.sequelize;

const { Op } = require("sequelize");

/**
 * Create a new conversation
 * @returns {Promise<Object>}
 */
const addConversation = (postData) => Conversation.create(postData);


/**
 * Get all conversations by User and retrieve login partner conversation
 * @param {number} idSender
 * @param {number} idReceiver
 * @returns {Promise<Object[]>}
 */
const getAllConversationsByUser = async (userId) => {
  try {
    const user = await userService.getById(userId);
    const userLogin = user.login;

    const sqlQuery = `
      SELECT DISTINCT
          c.id,
          p.name,
          u1.login as userLogin, u1.id as userId, u1.avatar as userAvatar,
          u2.login as receiverLogin, u2.id as receiverId, u2.avatar as receiverAvatar,
          m.read, m.ConversationId,
          CASE 
            WHEN u1.login != '${userLogin}' THEN u1.login
            ELSE u2.login
          END AS myInterlocutor
      FROM
          Conversation c
      INNER JOIN
          Message m ON c.id = m.ConversationId
      LEFT JOIN
          User u1 ON m.UserId = u1.id
      LEFT JOIN
          User u2 ON m.receiverId = u2.id
      LEFT JOIN
          Post p ON p.id = c.PostId
      WHERE
          u1.id = ${userId} OR u2.id = ${userId}
      GROUP BY c.id
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
            attributes: ["id", "login", "avatar"],
            as: "Receiver",
          },
          {
            model: User,
            attributes: ["id", "login", "avatar"],
            as: "Sender",
          },
        ],
        order: [["createdAt", "ASC"]],
      },
      {
        model: Post,
        attributes: ["name"],
      },
    ],
  });
};

/**
 * Check if post's conversation exist between 2 users
 * @param {number} idPost - id of the post
 * @param {number} idSender - id of the sender
 * @param {number} idReceiver - id of the receiver
 * @returns {boolean}
 */
const doesConversationExist = async (postId, senderId, receiverId) => {
  try {
    const conversation = await Conversation.findOne({
      where: {
        PostId: postId,
      },
      include: [
        {
          model: Message,
          attributes: ["receiverId", "UserId"],
          where: {
            [Op.or]: [
              { UserId: senderId, receiverId: receiverId },
              { UserId: receiverId, receiverId: senderId },
            ],
          },
        },
      ],
    });

    return !!conversation;
  } catch (error) {
    console.error("Error checking conversation existence:", error);
    throw error;
  }
};

module.exports = {
  addConversation,
  getAllConversationsByUser,
  getConversation,
  doesConversationExist,
};
