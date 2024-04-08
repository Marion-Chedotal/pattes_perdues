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

  // TODO: necessaire? 
  // /**
  //  * Find address by his id
  //  * @param {number} id
  //  * @returns {Promise<Object>}
  //  */
  // static async getAddress(id) {
  //   return await Address.findByPk(id);
  // }

  /**
   * Update address
   * @param {number} id
   * @param {object} data
   * @returns {Promise<Object[]>}
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
