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
  return await Post.findByPk(id, { include: User });
};

/**
 * Find all post
 * @returns {Promise<Array>}
 */
const getAll = async () => {
  return await Post.findAll({
    include: [{ model: Pet_category }, { model: Type }, { model: Address }],
    order: [['createdAt', 'DESC']]
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

// TODO: refacto par une méthode Filter
// filter by Address et/ou Type et/Ou Pet Category

// /**
//  * Find all post by Address
//  * @param {number} postalCode
//  * @returns {Promise<Array>}
//  */
// static async getByAddress(postalCode) {
//   return await Post.findAll({
//     include: {
//       model: Address,
//       attributes: ["postalCode", "city"],
//       where: {
//         postalCode: postalCode,
//       }
//     },
//   });
// }

// /**
//  * Find all post by type
//  * @param {number} typeId
//  * @returns {Promise<Object>}
//  */
// static async getByType(typeId) {
//   return await Post.findAll({
//     where: {
//       TypeId: typeId,
//     },
//     include: {
//       model: Type,
//       attributes: ["label"],
//     },
//   });
// }

// /**
//  * Find all post by pet category
//  *  @param {number} petCategoryId
//  * @returns {Promise<Object>}
//  */
// static async getByPetCategory(petCategoryId) {
//   return await Post.findAll({
//     where: {
//       PetCategoryId: petCategoryId,
//     },
//     include: {
//       model: Pet_category,
//       attributes: ["label"],
//     },
//   });
// }

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
  const post = await this.getById(id);

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
  getAllByUser,
  editPost,
  deletePost,
  isCorrectAddressee,
};
