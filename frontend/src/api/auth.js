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
export const login = async (idToken) => {
  try {
    const response = await axiosInstance.post('/login', {
      idToken, // Send the Firebase ID token to the backend
    });
    return response.data; // Returns the custom backend token
  } catch (error) {
    throw error.response?.data || 'Login failed';
  }
};

// Google Login API
export const googleLogin = async (idToken) => {
  console.log(API_BASE_URL);
  try {
    const response = await axiosInstance.post('/google-login', {
      idToken, // Send the ID token as part of the request body
    });
    return response.data; // Return the response from the backend
  } catch (error) {
    throw error.response?.data || 'Google Login failed';
  }
};