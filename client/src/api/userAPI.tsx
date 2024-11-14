import Auth from '../utils/auth';

// Base URL setup using VITE_API_URL for both local and production environments
const BASE_URL = import.meta.env.VITE_API_URL;

const retrieveUsers = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/users`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`
      }
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error('Invalid user API response, check network tab!');
    }

    return data;

  } catch (err) { 
    console.log('Error from data retrieval:', err);
    return [];
  }
};

export { retrieveUsers };

