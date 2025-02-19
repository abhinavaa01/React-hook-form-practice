import React, { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useEditModalStore, useMessageStore, useUniversalStore } from "../../zustand/store.js";
import { useForm } from "react-hook-form";
import { jsonApi, todoUtils } from "../../service";

const EditModal = () => {
  const allTodos = useUniversalStore((state)=> state.todos);
  const setTodos = useUniversalStore((state)=> state.setTodos);
  const show = useEditModalStore((state) => state.visiblity);
  const content = useEditModalStore((state) => state.modalContent);
  const hide = useEditModalStore((state) => state.hideModal);
  const failureFunc = useMessageStore((state)=> state.failure);
  const successFunc = useMessageStore((state)=> state.success);
  const loadingFunc = useMessageStore((state)=> state.loading);
  const {
    register,
    handleSubmit,
    formState: { touchedFields, errors, dirtyFields },
    setValue,
  } = useForm();

  useEffect(() => {
    // console.log("content changed", content);
    if (content?.data) {
      setValue("todoText", content.data.text);
    }
  }, [content]);

  const editTodoHandler = (data) => {
    loadingFunc("Updating Todo...");
    // declaring new Todo object
    const newTodo = {
      id: content?.data?.id,
      isCompleted: content?.data?.isCompleted,
      text: data.todoText,
      image: content?.data?.image,
    };

    // calling editTodo function from store
    // editTodoFunc(newTodo);

    // Saving the change on the server
    jsonApi.updateTodo(newTodo).then((res)=> {
      const newTodos = todoUtils.editTodo(allTodos, res);
      setTodos(newTodos);
      successFunc("Todo Updated Successfully on both server and local storage !");
    }).catch((err)=> {
      failureFunc(err.message? err.message + ", Editing in local Storage..." : "Failed to update Todo on server, updating in local storage...");
      const newTodos = todoUtils.editTodo(allTodos, newTodo);
      setTodos(newTodos);
    });


    // clearing the input field
    setValue("todoText", "");
    hide();
  };
  return (
    <Modal show={show} onHide={hide} centered>
      <div className="modal-header">
        <h5 className="modal-title">{content?.title}</h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
          onClick={hide}
        ></button>
      </div>
      <div className="modal-body">
        <form
          id="todo-input-group"
          className="input-group mb-3"
          onSubmit={handleSubmit(editTodoHandler)}
        >
          <input
            type="text"
            {...register("todoText", { required: true })}
            className={
              errors.todoText
                ? "form-control is-invalid"
                : touchedFields.todoText
                ? dirtyFields.todoText
                  ? "form-control is-valid"
                  : "form-control is-invalid"
                : "form-control"
            }
            defaultValue={content?.data?.text}
            aria-invalid={errors.todoText ? "true" : "false"}
            placeholder="Enter the correct task"
            aria-label="Enter the correct task"
          />
          <button
            className="btn btn-outline-success"
            type="submit"
            id="button-addon2"
            onClick={handleSubmit(editTodoHandler)}
          >
            SAVE
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default EditModal;
