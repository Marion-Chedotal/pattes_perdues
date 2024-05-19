const { Address, Post } = require("../models");

/**
 * Create a new address
 * @param {Object} data - data of the address
 * @returns {Promise<Object>}
 */
const addAddress = (data) => Address.create(data);

/**
 * find address
 * @param {string} street
 * @param {string} postalCode
 * @param {string} city
 * @returns {Promise<Object[]>}
 */
const findAddress = async ({ street, postalCode, city }) => {
  return await Address.findOne({
    where: {
      street,
      postalCode,
      city,
    },
  });
};

/**
 * find or create address
 * @param {string} street
 * @param {string} postalCode
 * @param {string} city
 * @returns {Promise<Object[]>}
 */
const findOrCreateAddress = async ({ street, postalCode, city }) => {
  // already sanitize and escape in post controller
  try {
    const addressAlreadyExist = await Address.findAddress({
      street,
      postalCode,
      city,
    });

    if (addressAlreadyExist) {
      return addressAlreadyExist;
    } else {
      const newAddress = await Address.addAddress({
        street,
        postalCode,
        city,
      });
      return newAddress;
    }
  } catch (error) {
    console.error(error);
    throw new Error(`Error when finding ou adding address, ${error}`);
  }
};

const findAndDeleteOrphanedAddresses = async () => {
  try {
    const allAddresses = await Address.findAll();

    const orphanedAddresses = await Promise.all(
      allAddresses.map(async (address) => {
        const associatedPosts = await Post.findOne({
          where: { AddressId: address.id },
        });
        return !associatedPosts ? address : null;
      })
    );

    const addressesToDelete = orphanedAddresses.filter(
      (address) => address !== null
    );

    await Promise.all(
      addressesToDelete.map(async (address) => {
        await address.destroy();
      })
    );
  } catch (error) {
    console.error(
      "Erreur lors de la suppression des adresses orphelines :",
      error
    );
  }
};

module.exports = {
  addAddress,
  findAddress,
  findOrCreateAddress,
  findAndDeleteOrphanedAddresses,
};
