import axios from "axios";

/**
 * Register a post
 * @param {object} formData - form data to be registered
 * @param {string} token - token
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
 * @returns {Promise<object>} - Promise resolving to the response object from the get endpoint
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
 * @param {integer} id - id of the post
 * @returns {Promise<object>} - Promise resolving to the response object from the get endpoint
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

/**
 * Get number of posts
 * @param {integer} userId - id of the current user
 * @param {string} token - token
 * @returns {Promise<object>} - Promise resolving to the response object from the get endpoint
 */
const getUserNumberOfPost = async (userId, token) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/api/posts/${userId}`,
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
 * Get user's posts
 * @param {integer} userId - id of the current user
 * @param {string} token - token
 * @returns {Promise<object>} - Promise resolving to the response object from the get endpoint
 */
const getUserPosts = async (login, token) => {

  try {
    const response = await axios.get(
      `http://localhost:3001/api/posts/user/${login}`,
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
 * Know if the currentUser is the post owner
 * @returns {Boolean} - True or false
 */
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
  getUserNumberOfPost,
  getUserPosts,
  isPostOwner,
  update,
  deletePost,
};
export default postService;
