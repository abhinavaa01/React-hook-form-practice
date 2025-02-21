import React, { useState } from "react";
import { useMessageStore, useUniversalStore } from "../../zustand/store";
import { useForm } from "react-hook-form";
import ImagePicker from "./ImagePicker";
import { jsonApi, todoUtils } from "../../service/index.js";

const TodoInput = () => {
  const allTodos = useUniversalStore((state) => state.todos);
  const setTodos = useUniversalStore((state) => state.setTodos);
  const userEmail = useUniversalStore((state) => state.userData)?.email;
  const [selectedImage, setSelectedImage] = useState("");
  const [clearImage, setClearImage] = useState(false);
  const success = useMessageStore((state) => state.success);
  const failure = useMessageStore((state) => state.failure);
  const loadingStore = useMessageStore((state) => state.loading);

  const {
    register,
    handleSubmit,
    formState: { touchedFields, errors, dirtyFields },
    setValue,
  } = useForm();

  const addTodoHandler = (data) => {
    loadingStore("Saving todo on server please wait...");
    const todoObj = {
      id: Date.now().toString().slice(5),
      text: data.todoText,
      image: selectedImage,
      isCompleted: false,
      userEmail: userEmail || "",
    };

    // Save todo in localstorage
    // Get the new TodosArr
    const newTodos = todoUtils.addTodo(allTodos, todoObj);
    setTodos(newTodos);

    // save the todo in the database
    jsonApi
      .storeNewTodo(todoObj)
      .then((res) => {
        // alert("Todo Added Successfully");
        success("Todo Added and saved to server Successfully");
      })
      .catch((err) => {
        failure("Failed to Save Todo on server... Added Todo to local storage");
      });

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
      className="input-group mb-3 border-bottom border-2"
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
