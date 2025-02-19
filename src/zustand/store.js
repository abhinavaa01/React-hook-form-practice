import { create } from "zustand";
import { persist } from 'zustand/middleware'

export const useUniversalStore = create(persist((set)=> ({
  // storage
  userData: {},
  isAuthenticated: false,
  todos: [],

  // functions
  setUser: (user) => set(()=>({ user, isAuthenticated: user? true : false })),
  setTodos: (todos) => set(()=>({ todos })),

}), {
  name: 'universal-storage',
}));

export const useModalStore = create((set)=> ({
  visiblity: false,
  modalContent: {},
  confirm: {},
  showModal: (content) => set(()=>({ visiblity: true, modalContent: content })),
  hideModal:  () => set(()=>({ visiblity: false, modalContent: {}, confirm: {} })),
  updateModal: (content, func) => set(()=>({ visiblity: true, modalContent: content, confirm: func })),
}));

export const useEditModalStore = create((set)=> ({
  visiblity: false,
  modalContent: {},
  afterMessage: {},
  showModal: (content) => set(()=>({ visiblity: true, modalContent: content })),
  hideModal: (msg) => {set(()=>({ visiblity: false, modalContent: {}, afterMessage: msg }));},
  updateModal: (content) => set(()=>({ visiblity: true, modalContent: content }))
}));

export const useMessageStore = create((set)=> ({
  successMessage: "",
  errorMessage: "",
  loadingMessage: "",
  success: (message) => {
    set(()=>({ successMessage: message }));

    setTimeout(() => {
      set(()=>({ successMessage: "" }));
    }, 4000);
  },
  failure: (message) => {
    set(()=>({ errorMessage: message }));

    setTimeout(() => {
      set(()=>({ errorMessage: "" }));
    }, 4000);
  },
  loading: (status) => {
    set(()=>({ successMessage: "", errorMessage: "", loading: status }));

    setTimeout(() => {
      set(()=>({ successMessage: "", errorMessage: "Request Timeout", loading: false }));
    }, 15000);
  }
}));