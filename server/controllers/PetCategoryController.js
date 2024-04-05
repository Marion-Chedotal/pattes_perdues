const PetCategoryService = require("../service/PetCategoryService");

/**
 * Get type by his id
 * @param {object} req
 * @param {object} res
 * @returns {object} pet category data
 * @throws {object} error
 */
const findById = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const label = req.params.label;

  try {
    const petCategory = await PetCategoryService.getPetCategoryById(id);
    if (!petCategory) {
      return res.status(400).json({ error: `This pet category doesn't exist` });
    }
    res.status(200).json(petCategory);
  } catch (error) {
    res.status(500).json({
      error: `Error when fetching pet category ${label}, ${error}`,
    });
  }
};
/**
 * Get all the pet category
 * @param {object} req
 * @param {object} res
 * @returns {object} pet category data
 * @throws {object} error
 */
const findAllPetCategory = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const label = req.params.label;

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

module.exports = { findById, findAllPetCategory };
