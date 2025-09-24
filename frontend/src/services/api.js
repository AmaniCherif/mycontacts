import axios from 'axios';

const API_URL = 'http://localhost:5000/auth';

// login
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data; // { token, user }
  } catch (error) {
    throw error.response?.data || error;
  }
};
