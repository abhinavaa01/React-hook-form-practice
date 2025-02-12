import "../../App.css";
import { useForm } from "react-hook-form";

const ExistingLogin = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { touchedFields, errors, dirtyFields },
    control,
  } = useForm();

  const login = (data) => {
    console.log(data);
  };

  const values = watch(["email", "password", "confirmPass"]);

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
                /^[a-zA-Z0-9. !#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\. [a-zA-Z0-9-]+)*$/,
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
    </form>
  );
};

export default ExistingLogin;
