import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { sendResetPasswordLink } from "../../service.js/auth.firebase";

const ResetPassword = () => {
  const [errorValues, setError] = useState(() => null);
  const [successValues, setSuccess] = useState(() => null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { touchedFields, errors, dirtyFields },
    control,
  } = useForm();

  const sendLink = (data) => {
    // console.log(data);
    sendResetPasswordLink(data.email)
      .then((res) => {
        console.log(res);
        setError("");
        setSuccess("Password reset link sent to your email successfully!");
      })
      .catch((err) => {
        setSuccess("");
        setError(err.message);
      });
  };
  return (
    <div className="d-flex">
      <div className="bg-white shadow mx-auto col-8 col-md-6 fixed-max-width my-5 p-3 rounded-3">
        <div id="chooseExisting" className="d-flex justify-content-center mb-2">
          <h3>Reset Password</h3>
        </div>
        <form
          action="#"
          onSubmit={handleSubmit(sendLink)}
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
            />
            <div className="invalid-feedback">
              Please enter a valid email address.
            </div>
          </div>

          <button type="submit" className="btn btn-primary col-12 mt-3" onClick={handleSubmit(sendLink)}>Send Link</button>
        </form>

        {errorValues ? (
          <span className="text-danger text-center w-100" role="alert">
            {errorValues}
          </span>
        ) : null}
        {successValues ? (
          <span className="text-success text-center w-100" role="alert">
            {successValues}
          </span>
        ) : null}
      </div>
    </div>
  );
};

export default ResetPassword;
