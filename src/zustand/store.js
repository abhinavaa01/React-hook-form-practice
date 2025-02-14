import { create } from "zustand";

export const useAuthStore = create((set) => ({
  isAuthenticated: false,
  userData: {},
  saveLogin: (data) => set(()=>({ isAuthenticated: true, userData: data })),
  saveLogout: () => set(()=>({ isAuthenticated: false, userData: {} })),
}));