import axiosInstance from "./Axios";
/**
 * Add message to a conversation
 * @returns {Promise<object>} - Promise resolving to the response object from the get endpoint
 */
const addMessage = async (id, formData, token) => {
  try {
    const response = await axiosInstance.post(
      `/conversation/${id}/message`,
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

const messageService = {
  addMessage,
};

export default messageService;
