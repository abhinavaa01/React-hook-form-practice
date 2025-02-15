import React, { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useEditModalStore, useTodoStore } from "../zustand/store";
import { useForm } from "react-hook-form";

const EditModal = () => {
  const show = useEditModalStore((state) => state.visiblity);
  const content = useEditModalStore((state) => state.modalContent);
  const hide = useEditModalStore((state) => state.hideModal);
  const editTodoFunc = useTodoStore((state) => state.editTodo);
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
    const newTodo = {
      id: content?.data?.id,
      isCompleted: content?.data?.isCompleted,
      text: data.todoText,
    };
    editTodoFunc(newTodo);
    setValue("todoText", "");
    hide({
      message: content.successMsg ? content.successMsg : "Successfull",
      success: true,
    });
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
