import axiosInstance from "./axios";

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

/**
 * Get last message of a conversation
 * @param {number} conversationId - conversation id
 * @param {string} token - token
 * @returns {Promise<object>} - Promise resolving to the response object from the get endpoint
 */
const getLastMessage = async (conversationId, token) => {
  try {
    const response = await axiosInstance.get(
      `/conversation/last-messages?conversationIds=${conversationId}`,
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
 * Indicate a message as read
 * @param {number} messageId - conversation id
 * @param {string} token - token
 * @returns {Promise<object>} - Promise resolving to the response object from the get endpoint
 */
const markAsRead = async (messageId, token) => {
  try {
    const response = await axiosInstance.post(
      `/conversation/${messageId}/mark-as-read`, {},
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
  getLastMessage,
  markAsRead,
};

export default messageService;
