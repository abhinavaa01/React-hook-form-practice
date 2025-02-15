import React from "react";
import { useEditModalStore, useModalStore, useTodoStore } from "../../zustand/store";

const Todo = ({ data, successFunc, loadingFunc, failureFunc }) => {
  const toggleCheck = useTodoStore((state) => state.toggleTodo);
  const delTodo = useTodoStore((state) => state.removeTodo);
  const delConfirm = useModalStore((state) => state.updateModal);
  const editModalContent = useEditModalStore((state) => state.updateModal);

  const completedHandler = (e) => {
    toggleCheck(data);
  };

  const editHandler = (e) => {
    e.preventDefault();
    console.log("edit clicked");
    editModalContent({
      title: "Edit Todo",
      data: data,
    });
  };

  const deleteHandler = (e) => {
    delConfirm({title : "Delete Todo", text: "Are you sure you want to delete this todo ?", data: data}, delTodo);
    // successFunc("Todo deleted Successfully !");
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
        <div className={data.isCompleted?"text-decoration-line-through text-muted":""}>{data.text}</div>
      </div>
      <div className="input-group d-flex col-12 justify-content-end">
        <span className={data.isCompleted? "btn btn-sm btn-outline-secondary disabled" : "btn btn-sm btn-outline-secondary"} role="button" onClick={editHandler} disabled={data.isCompleted}>
          Edit
        </span>
        <span className={data.isCompleted? "btn btn-sm btn-outline-danger disabled" : "btn btn-sm btn-outline-danger"} role="button" onClick={deleteHandler} disabled={data.isCompleted}>
          Delete
        </span>
      </div>
    </div>
  );
};

export default Todo;
