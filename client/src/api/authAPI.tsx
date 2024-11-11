import axios from 'axios';
import { UserLogin } from "../interfaces/UserLogin";

// Environment-specific base URL
const API_URL = `${import.meta.env.VITE_API_URL}/auth/login`; 

const login = async (userInfo: UserLogin) => {
  try {
    const response = await axios.post(API_URL, userInfo); 
    return response.data; 
  } catch (error) {
    throw new Error('Failed to log in. Please check your credentials.');
  }
};

export { login };




