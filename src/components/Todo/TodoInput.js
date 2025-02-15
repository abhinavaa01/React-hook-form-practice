import React, { useState } from "react";
import { useTodoStore } from "../../zustand/store";
import { useForm } from "react-hook-form";

const TodoInput = () => {
  const { addTodo } = useTodoStore();
  const {
    register,
    handleSubmit,
    formState: { touchedFields, errors, dirtyFields },
    setValue
  } = useForm();

  const addTodoHandler = (data) => {
    addTodo({
      id: Math.floor(Math.random() * 1000),
      text: data.todoText,
      isCompleted: false,
    });
    setValue("todoText", "");
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
          errors.username
            ? "form-control is-invalid"
            : touchedFields.username
            ? dirtyFields.username
              ? "form-control is-valid"
              : "form-control is-invalid"
            : "form-control"
        }
        aria-invalid={errors.username ? "true" : "false"}
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
    </form>
  );
};

export default TodoInput;
