const {
  getPetCategoryById,
  getAllPetCategory,
} = require("../service/PetCategoryService");

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
    const petCategory = await getPetCategoryById(id);
    if (!petCategory) {
      return res
        .status(400)
        .json({ error: `Cette catégorie n'existe pas` });
    }
    res.status(200).json(petCategory);
  } catch (error) {
    res.status(500).json({
      error: `Erreur lors de la récupération de la catégorie ${label}, ${error}`,
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
    const petCategory = await getAllPetCategory();

    if (!petCategory) {
      return res
        .status(400)
        .json({
          error: `Il n'y a pas de catégorie d'animaux associée aux annonces`,
        });
    }
    res.status(200).json(petCategory);
  } catch (error) {
    res.status(500).json({
      error: `Erreur lors de la récupération des catégories d'animaux, ${error}`,
    });
  }
};

module.exports = { findById, findAllPetCategory };
