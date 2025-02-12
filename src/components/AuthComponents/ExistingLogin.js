import { useState } from "react";
import { useForm } from "react-hook-form";
import { authCustomApi } from "../../service.js";

const ExistingLogin = () => {
  const [visiblePass, setVisiblity] = useState(() => false);
  const [errorValues, setError] = useState(() => null);
  const [successValues, setSuccess] = useState(() => null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { touchedFields, errors, dirtyFields },
    control,
  } = useForm();

  const login = (data) => {
    console.log("Log in started");
    authCustomApi
      .login(data.email, data.password)
      .then((userCred) => {
        // setUser((prevUser) => userCred.user);
        // user logged in
        setError("");
        setSuccess("Logged in as : " + userCred.user.email);
      })
      .catch((err) => {
        // alert("Error : See details in Console");
        // console.error("err:", err);
        setSuccess("");
        setError(err.message);
      });
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
      {/* Submit Button */}
      <button
        type="submit"
        onClick={handleSubmit(login)}
        className="btn btn-primary col-12 mt-4 mb-2"
      >
        Login
      </button>

      {errorValues ? (
        <span className="text-danger" role="alert">
          {errorValues}
        </span>
      ) : null}
      {successValues ? (
        <span className="text-success" role="alert">
          {successValues}
        </span>
      ) : null}
    </form>
  );
};

export default ExistingLogin;
