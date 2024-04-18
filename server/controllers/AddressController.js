const AddressService = require("../service/AddressService");
const AuthenticationService = require("../service/AuthenticationService");
const { escapeHtml } = require("../utils/htmlEscape");

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
  street = escapeHtml(street.trim());
  postalCode = escapeHtml(postalCode);

  try {
    await AddressService.addAddress({
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

/**
 * Update address
 * @param {object} req
 * @param {object} res
 * @returns {string} string success
 * @throws {object} error
 */
const updateAddress = async (res, req) => {
  const id = parseInt(req.params.id, 10);
  const currentUserId = req.user.id;

  const isUserAllowed = AuthenticationService.checkUserPermission(
    currentUserId,
    id
  );

  if (isUserAllowed) {
    try {
      const address = await AddressService.editAddress(id, data);

      if (!address) {
        return res.status(400).json({ error: `Address not found` });
      }
      res.status(200).json(`Address has been successfully updated`);
    } catch {
      res.status(500).json({
        error: `Error when updating address, ${error}`,
      });
    }
  } else {
    res.status(403).json({
      error: `You don't have the rights`,
    });
  }
};

module.exports = { createAddress, updateAddress };
