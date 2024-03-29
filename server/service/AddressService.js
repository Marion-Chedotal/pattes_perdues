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
 * Find address 
 * @returns {Promise<Object>}
 */
const getAddress = async () => {
  return await Address.findOne();
};

module.exports = {
    addAddress,
    getAddress
};
