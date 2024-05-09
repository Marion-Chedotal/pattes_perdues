import axios from "axios";

/**
 * Get user's conversations
 * @param {integer} login - login of the current user
 * @param {string} token - token
 * @returns {Promise<object>} - Promise resolving to the response object from the get endpoint
 */
const getUserConversations = async (login, token) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/api/user/${login}/conversations`,
      {
        // withCredentials: true,
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
    const response = await axios.get(`http://localhost:3001/api/user/${login}/conversation/${id}`,
    {
      withCredentials: true,
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
