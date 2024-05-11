import axiosInstance from "./Axios";
/**
 * Create message
 * @returns {Promise<object>} - Promise resolving to the response object from the get endpoint
 */
const addMessage = async (id, formData, token) => {
  try {
    const response = await axiosInstance.post(
      `/post/${id}/contact`,
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
  addMessage,
};

export default messageService;
