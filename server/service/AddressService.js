const { Address } = require("../models");

class AddressService {
  /**
   * Create a new address
   * @param {Object} data - data of the address
   * @returns {Promise<Object>}
   */

  static async addAddress(data) {
    return await Address.create(data);
  }

  /**
   * Find address by his id
   * @param {string} id
   * @returns {Promise<Object>}
   */
  static async getAddress(id) {
    return await Address.findOne(id);
  }

  /**
   * Update address
   * @param {string} id
   * @param {object} data
   * @returns {Promise<Object>}
   */
  static async editAddress(id, data) {
    return await Address.update(data, {
      where: {
        id,
      },
    });
  }
}

module.exports = AddressService;
