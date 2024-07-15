import axios from 'axios';

export const saveData = async (data) => {
  try {
    const response = await axios.post('http://localhost:3000/api/employees/save', data);
    return response.data;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Error response:', error.response);
      return {
        success: false,
        status: error.response.status,
        message: error.response.data.message || 'An error occurred',
        details: error.response.data,
      };
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Error request:', error.request);
      return {
        success: false,
        message: 'No response received from server',
      };
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error message:', error.message);
      return {
        success: false,
        message: error.message,
      };
    }
  }
};