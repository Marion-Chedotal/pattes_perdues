const { Type } = require("../models");

/**
 * Find all type of post
 * @returns {Promise<Object[]>}
 */
const getAllType = async () => {
  return await Type.findAll({
    attributes: ["id", "label"],
  });
};

module.exports = { getAllType };
