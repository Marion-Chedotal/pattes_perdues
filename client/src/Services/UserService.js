import axios from "axios";

/**
 * Get user informations from API
 * @param {number} id - user id
 * @param {string} token - token
 * @returns {Promise<Array<string>>} - Promise resolving to an array of
 */
const getUserInformation = async (id, token) => {
  try {
    const response = await axios.get(`http://localhost:3001/api/user/${id}`, {
      withCredentials: true,
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
 * Update user informations from API
 * @param {number} id - user id
 * @param {string} token - token
 * @returns {Promise<Array<string>>} - Promise resolving to an array of
 */
const updateUserInformation = async (id, userData, token) => {
  try {
    return await axios.put(`http://localhost:3001/api/user/${id}`, userData, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log(error)
    throw error.response.data;
  }
};

/**
 * Delete user account
 * @param {number} id -  user id
 * @param {string} token - token
 * @returns {Promise<Array<string>>} - Promise resolving to an array of
 */
const deleteUser = async (id, token) => {
  try {
    return await axios.delete(`http://localhost:3001/api/user/${id}`, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw error.response.data;
  }
};

const userService = { getUserInformation, updateUserInformation, deleteUser };
export default userService;
