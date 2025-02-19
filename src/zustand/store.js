import { create } from "zustand";
import { persist } from 'zustand/middleware'

export const useUniversalStore = create(persist((set)=> ({
  userData: {},
  isAuthenticated: false,
  todos: [],

  // functions
  setUser: (user) => set(()=>({ userData: user, isAuthenticated: user? true : false })),
  setTodos: (todos) => set(()=>({ todos })),

}), {
  name: 'universal-storage',
}));

export const useModalStore = create((set)=> ({
  visiblity: false,
  modalContent: {},
  showModal: (content) => set(()=>({ visiblity: true, modalContent: content })),
  hideModal:  () => set(()=>({ visiblity: false, modalContent: {}, confirm: {} })),
  updateModal: (content) => set(()=>({ visiblity: true, modalContent: content })),
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
    set(()=>({ successMessage: message, loadingMessage: "" }));

    setTimeout(() => {
      set(()=>({ successMessage: "" }));
    }, 4000);
  },
  failure: (message) => {
    set(()=>({ errorMessage: message, loadingMessage: "" }));

    setTimeout(() => {
      set(()=>({ errorMessage: "" }));
    }, 4000);
  },
  loading: (status) => {
    set(()=>({ loadingMessage: status }));

    setTimeout(() => {
      set(()=>({ successMessage: "", errorMessage: "", loadingMessage: "" }));
    }, 5000);
  }
}));