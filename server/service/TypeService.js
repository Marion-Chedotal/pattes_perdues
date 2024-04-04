const { Type } = require("../models");

/**
 * Find type of post by id
 * @param {string} id
 * @returns {Promise<Object>}
 */
const getTypeById = async (id) => {
    return await Type.findByPk(id);
  };

  /**
 * Find all type of post
 * @returns {Promise<Object>}
 */
const getAllType = async () => {
    return await Type.findAll();
  };
  
  module.exports = {
      getTypeById, getAllType 
  };