import { create } from "zustand";
import { login, register,logout ,me} from "../services/app.js";

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  checkingAuth: true,

   clearError: () => set({ error: null }),

  initializeAuth: async () => {
    try{
      const res = await me()
      set({
        user:res.user,
        isAuthenticated: true,
        checkingAuth:false
      })
    }catch(err){
       set({
        user:null,
        isAuthenticated: false,
        checkingAuth:false
       })
    }
  },

  login: async (data) => {
    try{
     set({
      loading: true,
      error: null
     })

     const res = await login(data)

     set({
      user : res.user,
      isAuthenticated: true,
      loading: false
     })
     return {success: true}
    }catch(err){
      set({
        error: err.response?.data?.message,
        loading: false
      })
      return {success: true}
    }
  },

  register: async (data) => {
    try {
      set({ loading: true, error: null });

      const res = await register(data);

      set({
        user: res.user,
        isAuthenticated: true,
        loading: false,
      });

      return { success: true };

    } catch (err) {
      set({
        error: err.response?.data?.message,
        loading: false,
      });

      return { success: false };
    }
  },

  logout: async () => {
    await logout()

    set({
      user: null,
      isAuthenticated: false,
    });
  },
}));

