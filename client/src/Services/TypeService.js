import axios from "axios";

/**
 * Get type from API
 * @param {number} postalCode -
 * @returns {Promise<Array<string>>} - Promise resolving to an array of
 */
const getType = async () => {
  try {
    const type = await axios.get(
      "http://localhost:3001/api/type"
      ,
      {
        withCredentials: true,
      });
    return type;
  } catch (error) {
    throw error.response.data;
  }
};

const typeService = { getType };
export default typeService;
