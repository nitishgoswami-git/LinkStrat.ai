// stores/useUserStore.js - COMPLETE ZUSTAND USER STORE
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import api from '../api/axios';  // Your axios instance
import { Navigate } from 'react-router-dom';

const useUserStore = create(
  persist(
    (set, get) => ({
      
      user: null,
      isLoading: false,
      isAuthenticated: false,

      // Actions
      fetchUser: async () => {
        const { setUser, setLoading } = get();
        set({ isLoading: true });
        
        try {
          const res = await api.get('/auth/me');
          setUser(res.data.user);
          return res.data.user;
        } catch (error) {
          setUser(null);
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      setUser: (user) => set({ 
        user, 
        isAuthenticated: !!user 
      }),

      logout: async () => {
        const { setUser, clearUser } = get();
        
        try {
          await api.post('/auth/logout'); 
          Navigate('/')
        } catch (error) {
          console.log('Logout API failed, clearing locally');
        }
        
        clearUser();
      },

      clearUser: () => set({ 
        user: null, 
        isAuthenticated: false 
      }),

      // Check if already has user (for SSR/fast init)
      checkAuth: async () => {
        const { user, isAuthenticated } = get();
        if (user && isAuthenticated) return true;
        
        try {
          await get().fetchUser();
          return get().isAuthenticated;
        } catch {
          return false;
        }
      },
    }),
    {
      name: 'user-storage',  // localStorage key
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated 
      }),  
    }
  )
);

export default useUserStore;
