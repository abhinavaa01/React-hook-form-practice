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


export const useTodoStore = create(persist((set)=> ({
  todos: [{id: 1, text: 'Sample Todo', isCompleted: false}],
  addTodo: (todo) => set((state)=> ({todos: [...state.todos, todo]})),
  removeTodo: (todo) => set((state)=> ({todos: state.todos.filter((t)=> t.id !== todo.id)})),
  editTodo: (todo) => set((state)=> ({todos: state.todos.map((t)=> t.id === todo.id ? todo : t)})),
  toggleTodo: (todo) => set((state)=> ({todos: state.todos.map((t)=> t.id === todo.id ? {...t, isCompleted: !t.isCompleted} : t)}))
}), {
  name: 'todo-storage',
}))

export const useModalStore = create((set)=> ({
  visiblity: false,
  modalContent: {},
  confirm: {},
  afterMessage: {},
  showModal: (content) => set(()=>({ visiblity: true, modalContent: content })),
  hideModal:  (msg) => {
    set(()=>({ visiblity: false, modalContent: {}, afterMessage: msg, confirm: {} }));

    setTimeout(() => {
      set(()=>({ afterMessage: {} }));
    }, 5000);
  },
  updateModal: (content, func) => set(()=>({ visiblity: true, modalContent: content, confirm: func })),
}));

export const useEditModalStore = create((set)=> ({
  visiblity: false,
  modalContent: {},
  afterMessage: {},
  showModal: (content) => set(()=>({ visiblity: true, modalContent: content })),
  hideModal: (msg) => {
    set(()=>({ visiblity: false, modalContent: {}, afterMessage: msg }));

    setTimeout(() => {
      set(()=>({ afterMessage: {} }));
    }, 5000);
  },
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