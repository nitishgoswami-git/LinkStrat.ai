// store/useUserStore.js
import { create } from 'zustand';
import { jwtDecode } from 'jwt-decode';

const useUserStore = create((set, get) => ({
  // State
  user: null,
  loading: true,
  error: null,

  // Actions
  setUser: (user) => set({ user, error: null }),
  
  setLoading: (loading) => set({ loading }),
  
  setError: (error) => set({ error }),

  // Load user from cookie
  loadUser: () => {
    try {
      set({ loading: true, error: null });

      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      if (!token) {
        set({ user: null, loading: false });
        return;
      }

      const decoded = jwtDecode(token);
      set({ user: decoded, loading: false });
    } catch (error) {
      console.error("Failed to load user:", error);
      set({ user: null, loading: false, error: error.message });
    }
  },

  // Logout
  logout: () => {
    // Clear cookie
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    set({ user: null, error: null });
  },

  // Update user (useful for profile updates)
  updateUser: (updates) => {
    const currentUser = get().user;
    if (currentUser) {
      set({ user: { ...currentUser, ...updates } });
    }
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return get().user !== null;
  },

  // Get user provider
  getProvider: () => {
    return get().user?.provider || null;
  },
}));

export default useUserStore;