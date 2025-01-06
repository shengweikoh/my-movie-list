import axios from 'axios';

// Define the backend API base URL
const API_BASE_URL = `${process.env.REACT_APP_BACKEND_BASE_URL}/auth`;

// Create an Axios instance with default settings
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Signup API
export const signup = async (email, password, displayName) => {
  try {
    const response = await axiosInstance.post('/signup', {
      email,
      password,
      displayName,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Signup failed';
  }
};

// Login API
export const login = async (email, password) => {
  try {
    const response = await axiosInstance.post('/login', {
      email,
      password,
    });
    return response.data; // Returns the token
  } catch (error) {
    throw error.response?.data || 'Login failed';
  }
};

// Google Login API
export const googleLogin = async (idToken) => {
  try {
    const response = await axiosInstance.post('/google-login', {
      idToken, // Send the ID token in the request body
    });
    return response.data; // Backend response
  } catch (error) {
    throw error.response?.data || 'Google Login failed';
  }
};