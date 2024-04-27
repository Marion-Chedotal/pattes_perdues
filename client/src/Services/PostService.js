import axios from "axios";

/**
 * Register a post
 * @param {object} formData - form data to be registered
 * @returns {Promise<object>} - Promise resolving to the response object from the post endpoint
 */
const register = async (formData, token) => {
  try {
    const response = await axios.post(
      "http://localhost:3001/api/post",
      formData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
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
    const response = await axios.get("http://localhost:3001/api/posts", {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error.message;
  }
};

/**
 * Get post details
 * @returns {Promise<object>} - Promise resolving to the response object from the post endpoint
 */
const getOne = async (id) => {
  try {
    const response = await axios.get(`http://localhost:3001/api/post/${id}`, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error.message;
  }
};

const isPostOwner = (currentUserId, userPostId) => {
  if (currentUserId === userPostId) return true;
};

const update = async (id, formData, token) => {
  try {
    const response = await axios.put(
      `http://localhost:3001/api/post/${id}`,
      formData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.message;
  }
};

const deletePost = async (id, token) => {
  try {
    const response = await axios.delete(
      `http://localhost:3001/api/post/${id}`,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.message;
  }
};
const postService = {
  register,
  getAll,
  getOne,
  isPostOwner,
  update,
  deletePost,
};
export default postService;
