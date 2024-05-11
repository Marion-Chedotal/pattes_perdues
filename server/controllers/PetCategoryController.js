const PetCategoryService = require("../service/PetCategoryService");

/**
 * Get all the pet category
 * @param {object} req
 * @param {object} res
 * @returns {object} pet category data
 * @throws {object} error
 */
const findAllPetCategory = async (req, res) => {

  try {
    const petCategory = await PetCategoryService.getAllPetCategory();

    if (!petCategory) {
      return res.status(400).json({
        error: `There is no pet category`,
      });
    }
    res.status(200).json(petCategory);
  } catch (error) {
    res.status(500).json({
      error: `Error when fetching pet category, ${error}`,
    });
  }
};

module.exports = { findAllPetCategory };
