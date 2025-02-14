import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { sendResetPasswordLink } from "../../service.js/auth.firebase";
import { authJsonApi } from "../../service.js/index.js";
import { useAuthStore } from "../../zustand/store.js";

const ResetPassword = () => {
  const [visiblePass, setVisiblity] = useState(() => false);
  const saveLogin = useAuthStore((state) => state.saveLogin);
  const user = useAuthStore((state) => state.userData);
  const [messages, setMessages] = useState({
    successMessage: "",
    errormessage: "",
    loading: false,
  });
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
      successMessage: msg,
      loading: false,
    });
  };

  const loading = () => {
    setMessages({
      errormessage: "",
      successMessage: "",
      loading: true,
    });

    setTimeout(() => {
      if (messages.loading) {
        setMessages({
          errormessage: "Request Timeout, Please try again later.",
          successMessage: "",
          loading: false,
        });
      }
    }, 15000);
  };

  const failure = (msg) => {
    setMessages({
      errormessage: msg,
      successMessage: "",
      loading: false,
    });
  };

  const sendLink = (data) => {
    // console.log(data);
    sendResetPasswordLink(data.email)
      .then((res) => {
        console.log(res);
        success("Password reset link sent to your email successfully!");
      })
      .catch((err) => {
        failure(err.message);
      });
  };

  const resetPass = (data) => {
    if (messages.loading) return;
    loading();
    authJsonApi.updateUserPassword(data.email, data.password).then((result)=> {
      success("Successfully resetted password !");
      saveLogin(result);
    }).catch((err)=> {
      failure(err.message? err.message : err);
    });
  }

  const toggleVisibility = (e) => {
    setVisiblity((prev) => !prev);
  };


  return (
    <div className="d-flex">
      <div className="bg-white shadow mx-auto col-8 col-md-6 fixed-max-width my-5 p-3 rounded-3">
        <div id="chooseExisting" className="d-flex justify-content-center mb-2">
          <h3>Reset Password</h3>
        </div>
        <form
          action="#"
          onSubmit={handleSubmit(resetPass)}
          className="needs-validation mb-2"
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
              placeholder={user.email? user.email : "Enter your email"}
            />
            <div className="invalid-feedback">
              Please enter a valid email address.
            </div>
          </div>
          <div className="form-group p-1">
            <label htmlFor="password">New Password</label>
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
                    message:
                      "Minimum 8 characters required for a strong password",
                  },
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,}$/,
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
                Password must contain at least one capital letter, one number,
                and one special character. Should be minimum 8 characters long.
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

          <button
            type="submit"
            className="btn btn-primary col-12 mt-3"
            onClick={handleSubmit(resetPass)}
            disabled={messages.loading}
          >
            {messages.loading ? "Loading... Please Wait" : "Reset Password"}
          </button>
        </form>

        {messages.errormessage ? (
          <span className="text-danger text-center w-100" role="alert">
            {messages.errormessage}
          </span>
        ) : null}
        {messages.successMessage ? (
          <span className="text-success text-center w-100" role="alert">
            {messages.successMessage}
          </span>
        ) : null}
      </div>
    </div>
  );
};

export default ResetPassword;
