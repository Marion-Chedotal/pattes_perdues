const { addAddress, getAddress } = require("../service/AddressService.js");
const { escapeHtml } = require("../utils/htmlEscape.js");

/**
 * Register a new address
 * @param {object} req
 * @param {object} res
 * @returns {string} string success
 * @throws {object} error
 */
const createAddress = async (req, res) => {
  let { street, postalCode, city } = req.body;

  // sanitize input
  street = escapeHtml(street);
  postalCode = escapeHtml(postalCode);

  try {
    await addAddress({
      street,
      postalCode,
      city,
    });

    res.status(201).json(`Your address has been successfully registered`);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: `Error when register address, ${error}`,
    });
  }
};

module.exports = { createAddress };
