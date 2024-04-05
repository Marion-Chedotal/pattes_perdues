const { Pet_category } = require("../models");

class PetCategoryService {
  /**
   * Find pet category of post by id
   * @param {string} id
   * @returns {Promise<Object>}
   */
  static async getPetCategoryById(id) {
    return await Pet_category.findByPk(id);
  }

  /**
   * Find all type of pet category
   * @returns {Promise<Object>}
   */
  static async getAllPetCategory() {
    return await Pet_category.findAll();
  }
}

module.exports = PetCategoryService;
