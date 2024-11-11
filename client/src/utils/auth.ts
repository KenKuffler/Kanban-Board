import { jwtDecode , JwtPayload } from 'jwt-decode';

const TOKEN_KEY = 'jwt_token'; // Key for storing token in localStorage
const LAST_ACTIVITY_KEY = 'last_activity'; // Key for storing the last activity time in localStorage
const MAX_INACTIVITY_DURATION = 30 * 60 * 1000; // 30 minutes of inactivity allowed

class AuthService {
  // Decode and return the user's profile (from the JWT token)
  getProfile() {
    const token = this.getToken();
    if (token) {
      return jwtDecode<JwtPayload>(token); // Return decoded token if it exists
    }
    return null;
  }

  // Check if the user is logged in by verifying if a token exists, is not expired, and the session hasn't timed out
  loggedIn() {
    const token = this.getToken();
    const isTokenValid = !!token && !this.isTokenExpired(token);
    const isSessionActive = !this.isSessionExpired();
    return isTokenValid && isSessionActive; // Returns true if token is valid and session is active
  }

  // Check if the token is expired
  isTokenExpired(token: string) {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (decoded && decoded.exp) {
        const currentTime = Date.now() / 1000;
        return decoded.exp < currentTime; // Return true if the token is expired
      }
      return false;
    } catch (error) {
      return true; // Return true if there's an error decoding the token
    }
  }

  // Check if the session is expired based on inactivity
  isSessionExpired() {
    const lastActivity = localStorage.getItem(LAST_ACTIVITY_KEY);
    if (lastActivity) {
      const currentTime = Date.now();
      const inactivityDuration = currentTime - parseInt(lastActivity);
      return inactivityDuration > MAX_INACTIVITY_DURATION; // Return true if inactivity exceeds the max duration
    }
    return false; // No activity recorded means session is still active
  }

  // Record the last activity time in localStorage
recordActivity(message?: string) {
  localStorage.setItem(LAST_ACTIVITY_KEY, Date.now().toString());
  if (message) {
    console.log(message); // Optionally log the message for tracking purposes
  }
}

  // Retrieve the JWT token from localStorage
  getToken(): string {
    return localStorage.getItem(TOKEN_KEY) || ''; // Get token from localStorage
  }

  // Log in the user by storing the token in localStorage, recording activity, and redirecting to the home page
  login(idToken: string) {
    localStorage.setItem(TOKEN_KEY, idToken); // Store the token in localStorage
    this.recordActivity(); // Record the login activity
    window.location.assign('/'); // Redirect to the home page
  }

  // Log out the user by removing the token and activity timestamp from localStorage and redirecting to the login page
  logout() {
    localStorage.removeItem(TOKEN_KEY); // Remove token from localStorage
    localStorage.removeItem(LAST_ACTIVITY_KEY); // Remove activity timestamp from localStorage
    window.location.assign('/login'); // Redirect to the login page
  }
}

export default new AuthService();
