const TypeService = require("../service/TypeService");

/**
 * Get type by his id
 * @param {object} req
 * @param {object} res
 * @returns {object} type's data
 * @throws {object} error
 */
const findById = async (req, res) => {
  const id = parseInt(req.params.id, 10);

  try {
    const type = await TypeService.getTypeById(id);
    if (!type) {
      return res.status(400).json({ error: `Type ${id} doesn't exist` });
    }
    res.status(200).json(type);
  } catch (error) {
    res.status(500).json({
      error: `Error when fetching type, ${error}`,
    });
  }
};
/**
 * Get all the type
 * @param {object} req
 * @param {object} res
 * @returns {object} all type's data
 * @throws {object} error
 */
const findAllType = async (req, res) => {
  const id = parseInt(req.params.id, 10);

  try {
    const type = await TypeService.getAllType();

    if (!type) {
      return res.status(400).json({ error: `Type ${id} doesn't exist` });
    }
    res.status(200).json(type);
  } catch (error) {
    res.status(500).json({
      error: `Error when fetching type, ${error}`,
    });
  }
};

module.exports = { findById, findAllType };
