const { Type } = require("../models");

class TypeService {
  /**
   * Find type of post by id
   * @param {string} id
   * @returns {Promise<Object>}
   */
  static async getTypeById(id) {
    return await Type.findByPk(id);
  }

  /**
   * Find all type of post
   * @returns {Promise<Object>}
   */
  static async getAllType() {
    return await Type.findAll();
  }
}

module.exports = TypeService;
