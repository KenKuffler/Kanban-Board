import axios from 'axios';
import { UserLogin } from "../interfaces/UserLogin";

const API_URL = import.meta.env.PROD
  ? import.meta.env.VITE_API_URL_PRODUCTION
  : import.meta.env.VITE_API_URL_LOCAL;

export interface LoginResponse {
  token: string;
}

const login = async (userInfo: UserLogin): Promise<LoginResponse> => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, userInfo); // Ensure path correctness
    console.log("Server response:", response.data); // Debugging log to check server response
    return response.data as LoginResponse;
  } catch (error) {
    console.error("Login error:", error); // Log login error
    throw new Error('Failed to log in. Please check your credentials.');
  }
};

export { login };







