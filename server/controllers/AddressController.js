const { addAddress, editAddress } = require("../service/AddressService");
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

const updateAddress = async (res, req) => {
  const id = parseInt(req.params.id, 10);
  const userId = req.user.id;
  const data = req.body;

  const userAllowed = checkUserPersimission(userId, id);

  if (userAllowed) {
    try {
      const address = await editAddress(id, data);

      if (!address) {
        return res.status(400).json({ error: `Adresse n'ont trouvé` });
      }
      res
        .status(200)
        .json(`${data.login}, votre adresse a bien été mise à jour`);
    } catch {
      res.status(500).json({
        error: `Erreur lors de la mise à jour de votre adresse, ${error}`,
      });
    }
  } else {
    res.status(500).json({
      error: `You don't have the rights`,
    });
  }
};

module.exports = { createAddress, updateAddress};
