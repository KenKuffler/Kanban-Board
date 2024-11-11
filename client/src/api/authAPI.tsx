import axios from 'axios';
import { UserLogin } from "../interfaces/UserLogin";

// Set API URL based on environment
const API_URL = import.meta.env.PROD
  ? import.meta.env.VITE_API_URL_PRODUCTION
  : import.meta.env.VITE_API_URL_LOCAL;

// Function to log in the user
const login = async (userInfo: UserLogin) => {
  try {
    const response = await axios.post(API_URL, userInfo); // Send POST request to login route
    return response.data; // Return the response (which should include the JWT token)
  } catch (error) {
    throw new Error('Failed to log in. Please check your credentials.'); // Handle login errors
  }
};

export { login };


