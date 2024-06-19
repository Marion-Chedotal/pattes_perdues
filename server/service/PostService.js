const { Post, User, Pet_category, Type } = require("../models");

/**
 * Create a new post
 * @param {Object} postData - data of the post
 * @returns {Promise<Object>}
 */
const addPost = (postData) => Post.create(postData);

/**
 * Find post by his id including user information
 * @param {number} id
 * @returns {Promise<Object>}
 */
const getById = async (id) => {
  return await Post.findByPk(id, {
    include: [
      {
        model: User,
        attributes: ["id", "login", "avatar"],
      },
      Pet_category,
      Type,
    ],
  });
};

/**
 * Find all post
 * @returns {Promise<Array>}
 */
const getAll = async () => {
  return await Post.findAll({
    include: [{ model: Pet_category }, { model: Type }],
    where: {
      is_active: true,
    },
    order: [["createdAt", "DESC"]],
  });
};

/**
 * Find the three latest created posts
 * @returns {Promise<Array>}
 */
const getThreeLatestPosts = async () => {
  return await Post.findAll({
    include: [{ model: Pet_category }, { model: Type }],
    order: [["createdAt", "DESC"]],
    where: {
      is_active: true,
    },
    limit: 3,
  });
};

/**
 * Find the three latest archives posts (pets founded)
 * @returns {Promise<Array>}
 */
const getThreeLatestArchivesPosts = async () => {
  return await Post.findAll({
    include: [{ model: Pet_category }, { model: Type }],
    where: {
      is_active: false,
    },
    order: [["updatedAt", "DESC"]],
    limit: 3,
  });
};

/**
 * Find all the archives posts (pets founded)
 * @returns {Promise<Array>}
 */
const getAllArchivesPosts = async () => {
  return await Post.findAll({
    include: [{ model: Pet_category }, { model: Type }],
    where: {
      is_active: false,
    },
    order: [["updatedAt", "DESC"]],
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
    include: [
      {
        model: User,
        attributes: ["login"],
      },
    ],
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

module.exports = {
  addPost,
  addPost,
  getById,
  getAll,
  getThreeLatestPosts,
  getThreeLatestArchivesPosts,
  getAllArchivesPosts,
  getAllByUser,
  countPostsByUser,
  editPost,
  deletePost,
};
