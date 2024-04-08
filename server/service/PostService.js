const { Post, User } = require("../models");

class PostService {
  /**
   * Create a new post
   * @param {Object} postData - data of the post
   * @returns {Promise<Object>}
   */
  static async addPost(postData) {
    return await Post.create(postData);
  }

  /**
   * Find post by his id including user information
   * @param {number} id
   * @returns {Promise<Object>}
   */
  static async getById(id) {
    return await Post.findByPk(id, { include: User });
  }

  /**
   * Find all post
   * @returns {Promise<Array>}
   */
  static async getAll() {
    return await Post.findAll();
  }

  /**
   * Find all post create by user
   * @param {number} userId
   * @returns {Promise<Array>}
   */
  static async getAllByUser(userId) {
    return await Post.findAll({
      where: {
        UserId: userId,
      },
      include: {
        model: User,
        attributes: ["login"],
      },
    });
  }

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
  static async editPost(idPost, data) {
    return await Post.update(data, {
      where: {
        id: idPost,
      },
    });
  }

  /**
   * Delete post
   * @param {number} id
   * @returns {Promise}
   */
  static async deletePost(id) {
    const post = await this.getById(id);

    return post.destroy();
  }

  /**
   * Check if userId of a post is the userId to receive a message
   * @param {number} postUserId
   * @param {number} receiverMessageId
   * @returns {boolean}
   */
  static async isCorrectAddressee(postUserId, receiverMessageId) {
    if (postUserId === receiverMessageId) return true;
  }
}

module.exports = PostService;
