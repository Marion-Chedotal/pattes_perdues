import axios from "axios";

/**
 * Get postalCode from API carto
 * @param {number} postalCode - Postal code to query
 * @returns {Promise<Array<string>>} - Promise resolving to an array of city names
 */
const getCity = async (postalCode) => {
  const apiUrl = "https://apicarto.ign.fr/api/codes-postaux/communes/";

  try {
    const response = await axios.get(apiUrl + postalCode);
    if (response.status === 200) {
      if (response.data.length === 0) {
        throw new Error("Aucune commune trouvée pour ce code postal.");
      }
      const cityName = response.data.map((city) => city.nomCommune);
      return cityName;
    }
  } catch (error) {
    console.error(error);
    return [];
  }
};

/**
 * Register a new user
 * @param {object} userData - User data to be registered
 * @returns {Promise<object>} - Promise resolving to the response object from the registration endpoint
 */
const register = async (userData) => {
  try {
    const response = await axios.post(
      "http://localhost:3001/auth/register",
      userData
    );
    return response;
  } catch (error) {
    console.error(error);
    throw new Error("Erreur de l'enregistrement.");
  }
};

const registerService = { getCity, register }
export default registerService ;
