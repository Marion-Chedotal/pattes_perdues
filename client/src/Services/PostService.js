import axiosInstance from "./Axios";

/**
 * Register a post
 * @param {object} formData - form data to be registered
 * @param {string} token - token
 * @returns {Promise<object>} - Promise resolving to the response object from the post endpoint
 */
const register = async (formData, token) => {
  try {
    const response = await axiosInstance.post("/post", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

/**
 * Get all posts
 * @returns {Promise<object>} - Promise resolving to the response object from the get endpoint
 */
const getAll = async () => {
  try {
    const response = await axiosInstance.get("/posts", {
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
    const response = await axiosInstance.get(`/post/${id}`, {
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
    const response = await axiosInstance.get(`/posts/${userId}`, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
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
    const response = await axiosInstance.get(`/posts/user/${login}`, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
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

/**
 * Get the last 3 posts
 * @returns {Promise<object>} - Promise resolving to the response object from the get endpoint
 */
const getLastThreePosts = async () => {
  try {
    const response = await axiosInstance.get("/posts/last-three", {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

/**
 * Get the last 3 archives posts (pets found)
 * @returns {Promise<object>} - Promise resolving to the response object from the get endpoint
 */
const getLastThreeArchivesPosts = async () => {
  try {
    const response = await axiosInstance.get("/posts/last-three-archives", {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const update = async (id, formData, token) => {
  try {
    const response = await axiosInstance.put(`/post/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const deletePost = async (id, token) => {
  try {
    const response = await axiosInstance.delete(`/post/${id}`, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
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
  getLastThreePosts,
  getLastThreeArchivesPosts,
  update,
  deletePost,
};
export default postService;
