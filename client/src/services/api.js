import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const generateMelody = async () => {
  try {
    const response = await axios.post(`${API_BASE_URL}/generate`);
    return response.data;
  } catch (error) {
    console.error('Error generating melody:', error);
    throw error;
  }
};
