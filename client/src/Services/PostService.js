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
      formData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.message;
  }
};

/**
 * Get all posts
 * @returns {Promise<object>} - Promise resolving to the response object from the post endpoint
 */
const getAll = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3001/api/posts",
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.message;
  }
};

const postService = { register, getAll };
export default postService;
