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

// export const useToDoStore = create(persist((set) => ({
//   todos: [],
//   addTodo: (todo) => set((state) => ({ todos: [...state.todos, todo] })),
//   removeTodo: (todo) => set((state) => ({ todos: state.todos.filter((t) => t !== todo) })),
//   clearTodos: () => set(() => ({ todos: [] })),
// }),{
//   name: 'todo-storage',
// }));


export const useTodoStore = create(persist((set)=> ({
  todos: [{id: 1, text: 'Sample Todo', isCompleted: false}],
  addTodo: (todo) => set((state)=> ({todos: [...state.todos, todo]})),
  removeTodo: (todo) => set((state)=> ({todos: state.todos.filter((t)=> t.id !== todo.id)})),
  editTodo: (todo) => set((state)=> ({todos: state.todos.map((t)=> t.id === todo.id ? todo : t)})),
  toggleTodo: (todo) => set((state)=> ({todos: state.todos.map((t)=> t.id === todo.id ? {...t, isCompleted: !t.isCompleted} : t)}))
}), {
  name: 'todo-storage',
}))