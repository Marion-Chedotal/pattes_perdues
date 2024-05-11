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
 * @param {number} id_post
 * @returns {Promise<Object>}
 */
const getById = async (id_post) => {
  return await Post.findByPk(id_post, {
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
 * Find all the archives posts (pets founded)
 * @returns {Promise<Array>}
 */
const getAllArchivesPosts = async () => {
  return await Post.findAll({
    include: [{ model: Pet_category }, { model: Type }, { model: Address }],
    where: {
      is_active: false,
    },
    order: [["updatedAt", "DESC"]],
  });
};

/**
 * Find all post create by user
 * @param {number} id_user
 * @returns {Promise<Array>}
 */
const getAllByUser = async (id_user) => {
  return await Post.findAll({
    where: {
      id_user,
    },
    include: {
      model: User,
      attributes: ["login"],
    },
  });
};

/**
 * Get the number of post by user
 * @param {number} id_user
 * @returns {Promise<Array>}
 */
const countPostsByUser = async (id_user) => {
  return await Post.count({
    where: {
      id_user,
    },
  });
};

/**
 * Update post
 * @param {number} id_post
 * @param {object} data
 * @returns {Promise<Object>}
 */
const editPost = async (id_post, data) => {
  return await Post.update(data, {
    where: {
      id_post,
    },
  });
};

/**
 * Delete post
 * @param {number} id_post
 * @returns {Promise}
 */
const deletePost = async (id_post) => {
  const post = await getById(id_post);

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
