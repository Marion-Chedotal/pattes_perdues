import axiosInstance from "./Axios";

/**
 * Get user's conversations
 * @param {string} login - login
 * @param {string} token - token
 * @returns {Promise<object>} - Promise resolving to the response object from the get endpoint
 */
const getUserConversations = async (login, token) => {
  try {
    const response = await axiosInstance.get(`/conversations/user/${login}`, {
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

const getOne = async (login, id, token) => {
  try {
    const response = await axiosInstance.get(`/conversation/${login}/${id}`, {
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
 * Start conversation with one message
 * @returns {Promise<object>} - Promise resolving to the response object from the get endpoint
 */
const start = async (receiverId, formData, token) => {
  try {
    const response = await axiosInstance.post(
      `conversation/${receiverId}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const conversationService = {
  getUserConversations,
  getOne,
  start,
};

export default conversationService;
