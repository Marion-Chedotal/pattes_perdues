import axios from "axios";
/**
 * Get all messages
 * @returns {Promise<object>} - Promise resolving to the response object from the get endpoint
 */
const getAll = async () => {
  try {
    const response = await axios.get(`http://localhost:${REACT_APP_PORT}/api/messages`, {
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
 * Create message
 * @returns {Promise<object>} - Promise resolving to the response object from the get endpoint
 */
const addMessage = async (id, formData, token) => {
  try {
    const response = await axios.post(
      `http://localhost:${REACT_APP_PORT}/api/post/${id}/contact`,
      JSON.stringify(formData),
      {
        withCredentials: true,
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
  getAll,
  addMessage,
};

export default messageService;
