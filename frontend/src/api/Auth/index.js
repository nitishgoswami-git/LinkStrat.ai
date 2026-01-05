// src/api/Auth.js
import api from "../axios";

export const authApi = {
  // Redirect to LinkedIn OAuth (no API call needed)
  login: async () => {
    const clientId = import.meta.env.VITE_LINKEDIN_CLIENT_ID;
    const redirectUri = encodeURIComponent(
      `${import.meta.env.VITE_API_URL}/auth/callback`
    );
    const scope = encodeURIComponent("openid profile email w_member_social");
    const state = Math.random().toString(36).substring(7); // CSRF protection

    // Store state in sessionStorage for verification
    sessionStorage.setItem("oauth_state", state);

    // Redirect to LinkedIn
    window.location.href = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&state=${state}`;
  },

  logout: async () => {
    const res = await api.post("/auth/logout");
    return res.data;
  },

  // Optional: Check if user is authenticated
  checkAuth: async () => {
    try {
      const res = await api.get("/auth/me");
      if (!res.data?.success) {
        throw new Error("Not authenticated");
      }
      return res.data;
    } catch (error) {
      console.log(
        "Auth check failed:",
        error.response?.status || error.message
      );
      throw error; // Let ProtectedRoute catch
    }
  },
};
