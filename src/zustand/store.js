import { create } from "zustand";
import { persist } from 'zustand/middleware'

export const useAuthStore = create(persist((set) => ({
  isAuthenticated: false,
  userData: {},
  saveLogin: (data) => set(()=>({ isAuthenticated: true, userData: data })),
  saveLogout: () => set(()=>({ isAuthenticated: false, userData: {} })),
}),{
  name: 'auth-storage',
}))