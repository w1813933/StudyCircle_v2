import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/auth';

export const signup = async (userData) => {
    try {
        return await axios.post(`${API_BASE_URL}/signup`, userData);
    } catch (error) {
        throw error.response?.data || "Signup failed.";
    }
};

export const login = async (userData) => {
    try {
        return await axios.post(`${API_BASE_URL}/login`, userData);
    } catch (error) {
        throw error.response?.data || "Login failed.";
    }
    
};

export const forgotPassword = async (userData) => {
    try {
        return await axios.post(`${API_BASE_URL}/forgot`, userData);
    } catch (error) {
        console.error("API error:", error); // Add log
        throw error.response?.data || "Password Reset Failed.";
    }
};