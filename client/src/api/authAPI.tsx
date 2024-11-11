import axios from 'axios';
import { UserLogin } from "../interfaces/UserLogin";

const API_URL = 'http://localhost:3001/auth/login'; // Adjust based on your server's URL

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
