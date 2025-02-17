import React, { useState } from "react";
import { useTodoStore } from "../../zustand/store";
import { useForm } from "react-hook-form";
import ImagePicker from "./ImagePicker";
import { jsonApi } from "../../service/index.js";

const TodoInput = () => {
  const { addTodo } = useTodoStore();
  const [selectedImage, setSelectedImage] = useState("");
  const [clearImage, setClearImage] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { touchedFields, errors, dirtyFields },
    setValue,
  } = useForm();

  const addTodoHandler = (data) => {
    const todoObj = {
      id: Math.floor(Math.random() * 1000),
      text: data.todoText,
      image: selectedImage,
      isCompleted: false,
    }
    // Add Todo in the store
    addTodo(todoObj);

    // save the todo in the database
    jsonApi.storeNewTodo(todoObj);

    // Clear the input field
    setClearImage(true);
    setValue("todoText", "");
    setTimeout(() => {
      setClearImage(false);
    }, 500);
  };

  const setImageString = (imageString) => {
    setSelectedImage(imageString);
  };
  return (
    <form
      id="todo-input-group"
      className="input-group mb-3"
      onSubmit={handleSubmit(addTodoHandler)}
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
        aria-invalid={errors.todoText ? "true" : "false"}
        placeholder="Add a task you want to do"
        aria-label="Add a task you want to do"
      />
      <button
        className="btn btn-outline-secondary"
        type="submit"
        id="button-addon2"
        onClick={handleSubmit(addTodoHandler)}
      >
        ADD
      </button>
      <div className="container">
        <ImagePicker handleImage={setImageString} clearImage={clearImage} />
      </div>
    </form>
  );
};

export default TodoInput;
