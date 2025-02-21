import React from "react";
import "../../index.css";
import {
  useEditModalStore,
  useMessageStore,
  useModalStore,
  useUniversalStore,
} from "../../zustand/store";
import { jsonApi, todoUtils } from "../../service";

const Todo = ({ data }) => {
  const setTodos = useUniversalStore((state) => state.setTodos);
  const allTodos = useUniversalStore((state) => state.todos);
  const delConfirm = useModalStore((state) => state.updateModal);
  const editModalContent = useEditModalStore((state) => state.updateModal);
  const successFunc = useMessageStore((state) => state.success);
  const failureFunc = useMessageStore((state) => state.failure);
  const loadingFunc = useMessageStore((state) => state.loading);

  const todoToggleHandler = (e) => {
    // e.preventDefault();
    loadingFunc("Updating Todo on server ...");
    const newTodo = { ...data, isCompleted: !data.isCompleted };
    const newTodos = todoUtils.toggleTodo(allTodos, data);
    setTodos(newTodos);
    jsonApi
      .updateTodo(newTodo)
      .then((updatedTodo) => {
        successFunc("Todo Updated on server Successfully !");
      })
      .catch((err) => {
        failureFunc(
          "Failed to update Todo on server ! Error: " + err.message
            ? err.message
            : err
        );
        console.error(err);
      });
  };

  const editHandler = (e) => {
    e.preventDefault();
    // console.log("edit clicked");
    editModalContent({
      title: "Edit Todo",
      data: data,
    });
  };

  const deleteHandler = (e) => {
    delConfirm({
      title: "Delete Todo",
      text: "Are you sure you want to delete this todo ?",
      data: data,
    });
  };

  return (
    <div className="col-12 mb-3 border-secondary border-bottom text-start d-flex flex-column pb-2">
      <div className="d-flex col-12">
        <input
          type="checkbox"
          className="me-2"
          checked={data.isCompleted}
          onChange={todoToggleHandler}
        />
        <div
          className={
            data.isCompleted ? "text-decoration-line-through text-muted" : ""
          }
        >
          {data.text}
        </div>
      </div>
      <div className="input-group d-flex col-12 justify-content-end zero-index">
        {data.image ? (
          <img
            src={data.image}
            className={
              data.isCompleted
                ? "todo-attachment-img me-auto rounded-2 m-2 less-contrast"
                : "todo-attachment-img me-auto rounded-2 m-2"
            }
          />
        ) : null}
        <span
          className={
            data.isCompleted
              ? "btn btn-sm h-min-content mt-auto btn-outline-secondary disabled"
              : "btn btn-sm h-min-content mt-auto btn-outline-secondary"
          }
          role="button"
          onClick={editHandler}
          disabled={data.isCompleted}
        >
          Edit
        </span>
        <span
          className={
            data.isCompleted
              ? "btn btn-sm h-min-content mt-auto btn-outline-danger disabled"
              : "btn btn-sm h-min-content mt-auto btn-outline-danger"
          }
          role="button"
          onClick={deleteHandler}
          disabled={data.isCompleted}
        >
          Delete
        </span>
      </div>
    </div>
  );
};

export default Todo;
