const { Address } = require("../models");

/**
 * Create a new address
 * @param {Object} data - data of the address
 * @returns {Promise<Object>}
 */

const addAddress = async (data) => {
  return await Address.create(data);
};

/**
 * Find address by his id
 * @param {string} id
 * @returns {Promise<Object>}
 */
const getAddress = async (id) => {
  return await Address.findOne(id);
};

/**
 * Update address
 * @param {string} id
 * @param {object} data
 * @returns {Promise<Object>}
 */
const editAddress = async (id, data) => {
  return await Address.update(data, {
    where: {
      id,
    },
  });
};

module.exports = {
    addAddress,
    getAddress,
    editAddress
};
