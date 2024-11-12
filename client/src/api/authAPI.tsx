import axios from 'axios';
import { UserLogin } from "../interfaces/UserLogin";
import auth from '../utils/auth'; // Adjust import path if necessary

// Set API URL based on environment
const API_URL = import.meta.env.PROD
  ? import.meta.env.VITE_API_URL_PRODUCTION
  : import.meta.env.VITE_API_URL_LOCAL;

// Function to log in the user
const login = async (userInfo: UserLogin) => {
  try {
    console.log("Attempting login with user info:", userInfo); // Log user info for debugging
    const response = await axios.post(API_URL, userInfo); // Send POST request to login route
    console.log("Login response:", response); // Log the full response
    console.log("Token received:", response.data.token); // Log only the token if available

    auth.login(response.data.token); // Pass the token to AuthService for storage and redirection
  } catch (error: any) {
    console.error('Failed to log in. Please check your credentials.', error);
    throw new Error('Failed to log in. Please check your credentials.');
  }
};

export { login };





