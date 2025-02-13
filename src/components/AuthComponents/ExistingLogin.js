import { useState } from "react";
import { useForm } from "react-hook-form";
import { authCustomApi, authJsonApi } from "../../service.js";

const ExistingLogin = () => {
  const [visiblePass, setVisiblity] = useState(() => false);
    const [messages, setMessages ] = useState({
      successMessage: "",
      errormessage: ""
    })

  const {
    register,
    handleSubmit,
    watch,
    formState: { touchedFields, errors, dirtyFields },
    control,
  } = useForm();

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

  const login = (data) => {
    console.log("Log in started");
    authJsonApi
      .login(data.email, data.password)
      .then((res) => {
        console.log(res);
        success("Logged in as : " + data.email);
      })
      .catch((err) => {
        failure(err.message);
      });
    // authCustomApi
    //   .login(data.email, data.password)
    //   .then((userCred) => {
    //     // setUser((prevUser) => userCred.user);
    //     // user logged in
    //     success("Logged in as : " + userCred.user.email);
    //   })
    //   .catch((err) => {
    //     // alert("Error : See details in Console");
    //     // console.error("err:", err);
    //     failure(err.message);
    //   });
  };

  const toggleVisibility = (e) => {
    setVisiblity((prev) => !prev);
  };

  return (
    <form
      action="#"
      onSubmit={handleSubmit(login)}
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
            Password is required.
          </div>
        </div>
      </div>
      {/* Submit Button */}
      <button
        type="submit"
        onClick={handleSubmit(login)}
        className="btn btn-primary col-12 mt-4 mb-2"
      >
        Login
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

export default ExistingLogin;
