import axiosInstance from "./Axios";

/**
 * Add message to a conversation
 * @param {number} conversationId - conversation id
 * @param {string} token - token
 * @returns {Promise<object>} - Promise resolving to the response object from the get endpoint
 */
const addMessage = async (conversationId, formData, token) => {
  try {
    const response = await axiosInstance.post(
      `/conversation/${conversationId}/message`,
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
    throw error.message;
  }
};

/**
 * Get if user has unread messages
 * @param {number} userId - user id
 * @param {string} token - token
 * @returns {Promise<object>} - Promise resolving to the response object from the get endpoint
 */
const userUnreadMessages = async (userId, token) => {

  try {
    const response = await axiosInstance.get(
      `/conversation/${userId}/unreadMessages`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error.message;
  }
};

const messageService = {
  addMessage,
  userUnreadMessages,
};

export default messageService;
