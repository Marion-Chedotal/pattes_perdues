import axiosInstance from "./axios";

/**
 * Get user informations from API
 * @param {number} id - user id
 * @param {string} token - token
 * @returns {Promise<Array<string>>} - Promise resolving to an array of
 */
const getUserInformation = async (id, token) => {
  try {
    const response = await axiosInstance.get(`/user/${id}`, {
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
 * @param {string} login -  user login
 * @param {string} token - token
 * @returns {Promise<Array<string>>} - Promise resolving to an array of
 */
const updateUserInformation = async (login, userData, token) => {
  try {
    return await axiosInstance.put(`/user/${login}`, userData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {

    throw error.response.data;
  }
};

/**
 * Delete user account
 * @param {string} login -  user login
 * @param {string} token - token
 * @returns {Promise<Array<string>>} - Promise resolving to an array of
 */
const deleteUser = async (login, token) => {
  try {
    return await axiosInstance.delete(`/user/${login}`, {
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
