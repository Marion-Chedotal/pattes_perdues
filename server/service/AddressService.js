const { Address } = require("../models");


  /**
   * Create a new address
   * @param {Object} data - data of the address
   * @returns {Promise<Object>}
   */

  const addAddress = async (data) => {
    return await Address.create(data);
  }

  /**
   * Update address
   * @param {number} id_address
   * @param {object} data
   * @returns {Promise<Object[]>}
   */
  const editAddress = async (id_address, data) => {
    return await Address.update(data, {
      where: {
        id_address,
      },
    });
  }


module.exports = { addAddress, editAddress};
