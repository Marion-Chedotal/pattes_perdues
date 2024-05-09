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
      const cityNames = response.data.map((city) => city.nomCommune);
      return cityNames;
    }
  } catch (error) {
    console.error("Error fetching city data:", error);
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
      "http://localhost:3306/api/register",
      userData
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

/**
 * Login
 * @param {object} userData - User data to be login
 * @returns {Promise<object>} - Promise resolving to the response object from the login endpoint
 */
const login = async (userData) => {
  try {
    const response = await axios.post(
      "http://localhost:3306/api/login",
      userData,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const authService = { getCity, register, login };
export default authService;
