const { Pet_category } = require("../models");

/**
 * Find all pet category
 * @returns {Promise<Object[]>}
 */
const getAllPetCategory = async () => {
  return await Pet_category.findAll({
    attributes: ["id", "label"],
  });
};

module.exports = { getAllPetCategory };
