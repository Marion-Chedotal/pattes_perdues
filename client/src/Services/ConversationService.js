import axiosInstance from "./Axios";

/**
 * Get user's conversations
 * @param {integer} login - login of the current user
 * @param {string} token - token
 * @returns {Promise<object>} - Promise resolving to the response object from the get endpoint
 */
const getUserConversations = async (login, token) => {
  try {
    const response = await axiosInstance.get(
      `/user/${login}/conversations`,
      {
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

const getOne = async (login, id, token) => {
  try {
    const response = await axiosInstance.get(`/user/${login}/conversation/${id}`,
    {
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

const conversationService = {
  getUserConversations,
  getOne,
};

export default conversationService;
