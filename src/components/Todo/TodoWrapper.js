import React, { useState } from "react";
import TodoInput from "./TodoInput";
import Todo from "./Todo";
import { useTodoStore } from "../../zustand/store";
import EditModal from "../EditModal";
import ConfirmModal from "../ConfirmModal";

const TodoWrapper = () => {
  const [messages, setMessages] = useState({
    errorMessage: "",
    successMessage: "",
    loading: false,
  });
  const todos = useTodoStore((state) => state.todos);
  const toggleTodo = useTodoStore((state) => state.toggleTodo);

  const loading = (status) => {
    setMessages({ successMessage: "", errorMessage: "", loading: status });

    setTimeout(() => {
      if (messages.loading) {
        setMessages({
          successMessage: "",
          errorMessage: "Request Timeout",
          loading: false,
        });
      }
    }, 15000);
  };

  const success = (message) => {
    setMessages({ successMessage: message, errorMessage: "", loading: false });

    setTimeout(() => {
      setMessages({ ...messages, successMessage: "" });
    }, 5000);
  };

  const failure = (message) => {
    setMessages({ successMessage: "", errorMessage: message, loading: false });

    setTimeout(() => {
      setMessages({ ...messages, errorMessage: "" });
    }, 5000);
  };

  return (
    <div id="todo-wrapper">
      <TodoInput />
      <div className="d-flex justify-content-center flex-column">
        {messages.loading && (
          <div className="alert alert-info" role="alert">
            <span className="spinner-border spinner-border-sm me-2"></span>
            Loading...
          </div>
        )}
        {messages.errorMessage && (
          <div className="alert alert-danger" role="alert">
            {messages.errorMessage}
          </div>
        )}
        {messages.successMessage && (
          <div className="alert alert-success" role="alert">
            {messages.successMessage}
          </div>
        )}
      </div>
      <div id="todos" className="d-flex flex-column">
        {todos.map((todo) => {
          return <Todo data={todo} key={todo.id} togglecheck={toggleTodo} loadingFunc={loading} successFunc={success} failureFunc={failure} />;
        })}
      </div>

      <EditModal />
      <ConfirmModal />
    </div>
  );
};

export default TodoWrapper;
