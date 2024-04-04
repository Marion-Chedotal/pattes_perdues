const { getTypeById, getAllType } = require("../service/TypeService");

/**
 * Get type by his id
 * @param {object} req
 * @param {object} res
 * @returns {object} type's data
 * @throws {object} error
 */
const findById = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const label = req.params.label;

  try {
    const type = await getTypeById(id);
    if (!type) {
      return res.status(400).json({ error: `Ce type n'existe pas` });
    }
    res.status(200).json(type);
  } catch (error) {
    res.status(500).json({
      error: `Erreur lors de la récupération du type ${label}, ${error}`,
    });
  }
};
/**
 * Get all the type
 * @param {object} req
 * @param {object} res
 * @returns {object} type's data
 * @throws {object} error
 */
const findAllType = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const label = req.params.label;

  try {
    const type = await getAllType();

    if (!type) {
      return res.status(400).json({ error: `Il n'y a pas de type associé aux annonces` });
    }
    res.status(200).json(type);
  } catch (error) {
    res.status(500).json({
      error: `Erreur lors de la récupération des types d'annonce, ${error}`,
    });
  }
};

module.exports = { findById, findAllType };
