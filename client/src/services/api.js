import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const generateMelody = async () => {
  try {
    const response = await axios.post(`${API_BASE_URL}/generate`);
    return response.data;
  } catch (error) {
    console.error('Error generating melody:', error);
    throw error;
  }
};
