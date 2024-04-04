const { Pet_category } = require("../models");

/**
 * Find pet category of post by id
 * @param {string} id
 * @returns {Promise<Object>}
 */
const getPetCategoryById = async (id) => {
    return await Pet_category.findByPk(id);
  };

  /**
 * Find all type of pet category
 * @returns {Promise<Object>}
 */
const getAllPetCategory = async () => {
    return await Pet_category.findAll();
  };
  
  module.exports = {
    getPetCategoryById, getAllPetCategory
  };