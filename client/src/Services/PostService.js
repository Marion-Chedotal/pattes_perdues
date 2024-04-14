import axios from "axios";

/**
 * Register a post
 * @param {object} formData - form data to be registered
 * @returns {Promise<object>} - Promise resolving to the response object from the post endpoint
 */
const register = async (formData) => {
  try {
    const response = await axios.post(
      "http://localhost:3001/api/post",
      formData
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const postService = { register };
export default postService;
