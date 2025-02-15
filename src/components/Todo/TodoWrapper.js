import React, { use } from "react"
import TodoInput from "./TodoInput";
import Todo from "./Todo";
import { useTodoStore } from "../../zustand/store";

const TodoWrapper = () => {
    const todos = useTodoStore((state) => state.todos);
    const toggleTodo = useTodoStore((state) => state.toggleTodo);
  return (
    <div id="todo-wrapper">
      <TodoInput />
      <div id="todos" className="d-flex flex-column">
        {todos.map((todo)=> {
            return <Todo data={todo} key={todo.id} togglecheck={toggleTodo} />
        })}
      </div>
    </div>
  )
};

export default TodoWrapper;
