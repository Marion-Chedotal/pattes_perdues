import axios from "axios";

/**
 * Get pet category from API
 * @returns {Promise<Array<string>>} - Promise resolving to an array of
 */
const getPetCategory = async () => {
  try {
    const petCategory = await axios.get(
      "http://localhost:3001/api/petCategory",
      {
        withCredentials: true,
      }
    );
    return petCategory;
  } catch (error) {
    throw error.response.data;
  }
};

const categoryService = { getPetCategory };
export default categoryService;
