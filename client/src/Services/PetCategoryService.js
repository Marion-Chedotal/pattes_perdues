import axiosInstance from "./Axios";

/**
 * Get pet category from API
 * @returns {Promise<Array<string>>} - Promise resolving to an array of
 */
const getPetCategory = async () => {
  try {
    const petCategory = await axiosInstance.get("/petCategory");
    return petCategory;
  } catch (error) {
    throw error.response.data;
  }
};

const categoryService = { getPetCategory };
export default categoryService;
