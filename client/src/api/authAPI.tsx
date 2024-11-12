import axios from 'axios';
import { UserLogin } from "../interfaces/UserLogin";

const API_URL = import.meta.env.PROD
  ? import.meta.env.VITE_API_URL_PRODUCTION
  : import.meta.env.VITE_API_URL_LOCAL;

export interface LoginResponse {
  token: string;
}

// Function to log in the user
const login = async (userInfo: UserLogin): Promise<LoginResponse> => {
  try {
    const response = await axios.post(API_URL, userInfo);
    return response.data as LoginResponse; // Explicitly define the response type
  } catch (error) {
    throw new Error('Failed to log in. Please check your credentials.');
  }
};

export { login };






