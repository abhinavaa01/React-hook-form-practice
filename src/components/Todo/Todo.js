import React from "react";
import { useTodoStore } from "../../zustand/store";

const Todo = ({ data }) => {
  const toggleCheck = useTodoStore((state) => state.toggleTodo);
  const delTodo = useTodoStore((state) => state.removeTodo);

  const completedHandler = (e) => {
    toggleCheck(data);
  };

  const editHandler = (e) => {
    console.log("Edit button clicked");
  };

  const deleteHandler = (e) => {
    delTodo(data);
  };

  return (
    <div className="col-12 mb-3 border-secondary border-bottom text-start d-flex flex-column pb-2">
      <div className="d-flex col-12">
        <input
          type="checkbox"
          className="me-2"
          checked={data.isCompleted}
          onChange={completedHandler}
        />
        <div className={data.isCompleted?"text-decoration-line-through":""}>{data.text}</div>
      </div>
      <div className="input-group d-flex col-12 justify-content-end">
        <span className="btn btn-sm btn-outline-secondary" role="button" onClick={editHandler} disabled={data.isCompleted}>
          Edit
        </span>
        <span className="btn btn-sm btn-outline-danger" role="button" onClick={deleteHandler} disabled={data.isCompleted}>
          Delete
        </span>
      </div>
    </div>
  );
};

export default Todo;
