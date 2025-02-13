import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { authCustomApi, authJsonApi } from "../../service.js";

const NewSignup = () => {
  const [visiblePass, setVisiblity] = useState(() => false);
  const [messages, setMessages ] = useState({
    successMessage: "",
    errormessage: ""
  })

  const success = (msg) => {
    setMessages({
      errormessage: "",
      successMessage: msg
    })
  }

  const failure = (msg) => {
    console.error("err:--", msg);
    setMessages({
      errormessage: msg,
      successMessage: ""
    })
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { touchedFields, errors, dirtyFields },
    control,
  } = useForm();

  const signUp = (data) => {
    // console.log("Sign Up started");
    const dataToSave = {
      email: data.email,
      password: data.password,
    }
    authJsonApi.signUp(dataToSave).then((result)=> {
      console.log(result);
      success("Signed Up as : " + data.email);
    }).catch((errmsg)=> {
      failure(errmsg.message);
    })
    // authCustomApi
    //   .createAccount(data.email, data.password)
    //   .then((userCred) => {
    //     // setUser((prevUser) => userCred.user);
    //     // user logged in
    //     setError("");
    //     setSuccess("Signed Up as : " + userCred.user.email);
    //   })
    //   .catch((err) => {
    //     // alert("Error : See details in Console");
    //     // console.error("err:", err);
    //     setSuccess("");
    //     setError(err.message);
    //   });
  };

  const toggleVisibility = (e) => {
    setVisiblity((prev) => !prev);
  };

  return (
    <form
      action="#"
      onSubmit={handleSubmit(signUp)}
      className="needs-validation"
      noValidate
    >
      <div className="form-group p-1">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          className={
            errors.email
              ? "form-control is-invalid"
              : touchedFields.email
              ? dirtyFields.email
                ? "form-control is-valid"
                : "form-control is-invalid"
              : "form-control"
          }
          name="email"
          {...register("email", {
            required: "Please enter a valid email address.",
            pattern: {
              value:
                /^[a-zA-Z0-9. !#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              message: "Please enter a valid email address.",
            },
          })}
          aria-invalid={errors.email ? "true" : "false"}
          id="email"
        />
        <div className="invalid-feedback">
          Please enter a valid email address.
        </div>
      </div>
      <div className="form-group p-1">
        <label htmlFor="password">Password</label>
        <div className="position-relative">
          <input
            type={visiblePass ? "text" : "password"}
            className={
              errors.password
                ? "form-control is-invalid"
                : touchedFields.password
                ? dirtyFields.password
                  ? "form-control is-valid"
                  : "form-control is-invalid"
                : "form-control"
            }
            name="password"
            {...register("password", {
              required: true,
              min: {
                value: 8,
                message: "Minimum 8 characters required for a strong password",
              },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,}$/,
                message:
                  "Password should be 8-24 characters and include at least 1 letter, 1 number and 1 special character!",
              },
            })}
            aria-invalid={errors.password ? "true" : "false"}
            id="password"
          />
          <i
            className="position-absolute top-50 end-0 me-2"
            id="togglePassword"
            onClick={toggleVisibility}
            style={{ transform: "translateY(-50%)", cursor: "pointer" }}
          >
            {visiblePass ? "🙈" : "👁"}
          </i>
          <div className="invalid-feedback">
            Password must contain at least one capital letter, one number, and
            one special character. Should be minimum 8 characters long.
          </div>
        </div>
      </div>
      <div className="form-group p-1">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="text"
          className={
            errors.confirmPassword
              ? "form-control is-invalid"
              : touchedFields.confirmPassword
              ? dirtyFields.confirmPassword
                ? "form-control is-valid"
                : "form-control is-invalid"
              : "form-control"
          }
          name="confirmPassword"
          {...register("confirmPassword", {
            required: true,
            validate: (val) => {
              if (watch("password") != val) {
                return "Your passwords do not match";
              }
            },
          })}
          aria-invalid={errors.confirmPassword ? "true" : "false"}
          id="confirmPassword"
        />
        <div className="invalid-feedback">Passwords do not match.</div>
      </div>
      {/* Submit Button */}
      <button
        type="submit"
        onClick={handleSubmit(signUp)}
        className="btn btn-primary col-12 mt-4 mb-2"
      >
        Sign Up
      </button>

      {messages.errormessage ? (
        <span className="text-danger" role="alert">
          {messages.errormessage}
        </span>
      ) : null}
      {messages.successMessage ? (
        <span className="text-success" role="alert">
          {messages.successMessage}
        </span>
      ) : null}
    </form>
  );
};

export default NewSignup;
