const typeService = require("../service/typeService");

/**
 * Get all the type
 * @param {object} req
 * @param {object} res
 * @returns {object} all type's data
 * @throws {object} error
 */
const findAllType = async (req, res) => {

  try {
    const type = await typeService.getAllType();

    if (!type) {
      return res.status(400).json({ error: `There is no pet category` });
    }
    res.status(200).json(type);
  } catch (error) {
    res.status(500).json({
      error: `Error when fetching type, ${error}`,
    });
  }
};

module.exports = { findAllType };
