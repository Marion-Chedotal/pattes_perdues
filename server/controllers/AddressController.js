const addressService = require("../service/addressService");
const authenticationService = require("../service/authenticationService");

/**
 * Register a new address
 * @param {object} req
 * @param {object} res
 * @returns {string} string success
 * @throws {object} error
 */
const createAddress = async (req, res) => {
  // already sanitize and escape in post controller
  let { street, postalCode, city } = req.body;

  try {
    const address = await addressService.addAddress({
      street,
      postalCode,
      city,
    });

    res.status(201).json(address);
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
  // already sanitize and escape in post controller
  const id = parseInt(req.params.id, 10);
  const currentUserId = req.userId;

  const isUserAllowed = authenticationService.checkUserPermission(
    currentUserId,
    id
  );

  if (!isUserAllowed) {
    res.status(403).json({
      error: `You don't have the rights`,
    });
  }
  try {
    const address = await addressService.editAddress(id, data);

    if (!address) {
      return res.status(400).json({ error: `Address not found` });
    }
    res.status(200).json(address);
  } catch {
    res.status(500).json({
      error: `Error when updating address, ${error}`,
    });
  }
};

module.exports = { createAddress, updateAddress };
