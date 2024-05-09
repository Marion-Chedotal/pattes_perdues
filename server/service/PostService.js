const { Post, User, Pet_category, Type, Address } = require("../models");

/**
 * Create a new post
 * @param {Object} postData - data of the post
 * @returns {Promise<Object>}
 */
const addPost = async (postData) => {
  return await Post.create(postData);
};

/**
 * Find post by his id including user information
 * @param {number} id
 * @returns {Promise<Object>}
 */
const getById = async (id) => {
  return await Post.findByPk(id, {
    include: [
      { model: User, attributes: { exclude: ["password", "email"] } },
      Pet_category,
      Type,
      Address,
    ],
  });
};

/**
 * Find all post
 * @returns {Promise<Array>}
 */
const getAll = async () => {
  return await Post.findAll({
    include: [{ model: Pet_category }, { model: Type }, { model: Address }],
    order: [["createdAt", "DESC"]],
  });
};

/**
 * Find the three latest created posts
 * @returns {Promise<Array>}
 */
const getThreeLatestPosts = async () => {
  return await Post.findAll({
    include: [{ model: Pet_category }, { model: Type }, { model: Address }],
    order: [["createdAt", "DESC"]],
    limit: 3,
  });
};

/**
 * Find the three latest archives posts (pets founded)
 * @returns {Promise<Array>}
 */
const getThreeLatestArchivesPosts = async () => {
  return await Post.findAll({
    include: [{ model: Pet_category }, { model: Type }, { model: Address }],
    where: {
      is_active: false,
    },
    order: [["updatedAt", "DESC"]],
    limit: 3,
  });
};

/**
 * Find all post create by user
 * @param {number} userId
 * @returns {Promise<Array>}
 */
const getAllByUser = async (userId) => {
  return await Post.findAll({
    where: {
      UserId: userId,
    },
    include: {
      model: User,
      attributes: ["login"],
    },
  });
};

/**
 * Get the number of post by user
 * @param {number} userId
 * @returns {Promise<Array>}
 */
const countPostsByUser = async (userId) => {
  return await Post.count({
    where: {
      UserId: userId,
    },
  });
};

/**
 * Update post
 * @param {number} idPost
 * @param {object} data
 * @returns {Promise<Object>}
 */
const editPost = async (idPost, data) => {
  return await Post.update(data, {
    where: {
      id: idPost,
    },
  });
};

/**
 * Delete post
 * @param {number} id
 * @returns {Promise}
 */
const deletePost = async (id) => {
  const post = await getById(id);

  return post.destroy();
};

/**
 * Check if userId of a post is the userId to receive a message
 * @param {number} postUserId
 * @param {number} receiverMessageId
 * @returns {boolean}
 */
const isCorrectAddressee = async (postUserId, receiverMessageId) => {
  if (postUserId === receiverMessageId) return true;
};

module.exports = {
  addPost,
  addPost,
  getById,
  getAll,
  getThreeLatestPosts,
  getThreeLatestArchivesPosts,
  getAllByUser,
  countPostsByUser,
  editPost,
  deletePost,
  isCorrectAddressee,
};
