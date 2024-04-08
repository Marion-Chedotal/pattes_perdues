const { User, Address } = require("../models");

class UserService {
  /** check if the email is already used
   * @param {string} email
   * @returns { Promise<object> }
   */
  static async checkEmailExists(email) {
    return await User.findOne({ where: { email: email } });
  }

  /** check if the login is already used
   * @param {string} login
   * @returns { Promise<object> }
   */
  static async checkLoginExists(login) {
    return await User.findOne({ where: { login: login } });
  }

  /**
   * Create a new user
   * @param {Object} userData - data of the user
   * @returns {Promise<Object>}
   */

  static async registerUser(userData) {
    return await User.create(userData);
  }

  /**
   * Find user by login
   * @param {string} login
   * @returns {Promise<Object>}
   */
  static async getByLogin(login) {
    return await User.findOne({
      where: {
        login,
      },
    });
  }

  /**
   * Find user by his id and get his address
   * @param {number} id
   * @returns {Promise<Object>}
   */
  static async getById(id) {
    return await User.findByPk(id, {
      include: {
        model: Address,
        attributes: ["street", "postalCode", "city"],
      },
    });
  }

  /**
   * Update user
   * @param {number} idUser
   * @param {object} data
   * @returns {Promise<Object>}
   */
  static async editUser(idUser, data) {
    return await User.update(data, {
      where: {
        id: idUser,
      },
    });
  }

  /**
   * Delete user
   * @param {number} id
   * @returns {Promise}
   */
  static async deleteUser(id) {
    const user = await this.getById(id);

    return user.destroy();
  }
}

module.exports = UserService;
