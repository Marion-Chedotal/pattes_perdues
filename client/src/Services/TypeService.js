import axiosInstance from "./Axios";

/**
 * Get type from API
 * @param {number} postalCode -
 * @returns {Promise<Array<string>>} - Promise resolving to an array of
 */
const getType = async () => {
  try {
    const type = await axiosInstance.get("/type");
    return type;
  } catch (error) {
    throw error.response.data;
  }
};

const typeService = { getType };
export default typeService;
