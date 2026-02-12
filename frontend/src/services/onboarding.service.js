import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/onboarding/register`, userData);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Failed to register user' };
    }
};

export const checkEmailExists = async (email) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/onboarding/check-email/${email}`);
        return response.data.exists;
    } catch (error) {
        console.error('Error checking email:', error);
        return false;
    }
};
