import "./App.css";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useState } from "react";

function App() {
  const [visiblePass, setVisiblity] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { touchedFields, errors, dirtyFields },
    control,
  } = useForm();
  const values = watch([
    "username",
    "firstname",
    "lastname",
    "email",
    "phone",
    "password",
    "confirmPassword",
    "street",
    "address2",
    "city",
    "state",
    "zip",
  ]);
  const onSubmit = (data) => {
    console.log("form submitted");
    console.log(data);
    // console.log("fs:", formState);
  };

  const toggleVisibility = (e) => {
    setVisiblity((prev) => !prev);
  };

  return (
    <div className="App var-bg vh-100 overflow-auto">
      <div
        id="form"
        className="col-8 col-md-6 mx-auto bg-white p-4 my-4 rounded-3"
      >
        <h3 id="form__head" className="mb-4 text-center">
          Form Validation
        </h3>
        <form
          id="newform"
          action="#"
          onSubmit={handleSubmit(onSubmit)}
          className="needs-validation text-start"
          noValidate
        >
          <div className="form-group p-1">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className={
                errors.username
                  ? "form-control is-invalid"
                  : touchedFields.username
                  ? dirtyFields.username
                    ? "form-control is-valid"
                    : "form-control is-invalid"
                  : "form-control"
              }
              id="username"
              name="username"
              {...register("username", {
                required: "Username cannot be blank or have spaces.",
              })}
              aria-invalid={errors.username ? "true" : "false"}
            />
            <div className="invalid-feedback">
              Username cannot be blank or have spaces.
            </div>
            <div className="valid-feedback">Looks Good</div>
          </div>

          <div className="row">
            <div className="col-md-6 col-12">
              <div className="form-group p-1">
                <label htmlFor="firstname">First Name</label>
                <input
                  type="text"
                  className={
                    errors.firstname
                      ? "form-control is-invalid"
                      : touchedFields.firstname
                      ? dirtyFields.firstname
                        ? "form-control is-valid"
                        : "form-control is-invalid"
                      : "form-control"
                  }
                  id="firstname"
                  name="firstname"
                  {...register("firstname", {
                    required: "Please enter your first name.",
                    pattern: {
                      value: /^[A-Za-z]+$/,
                      message: "Only alphabets allowed",
                    },
                  })}
                  aria-invalid={errors.firstname ? "true" : "false"}
                />
                <div className="invalid-feedback">
                  Please enter your First name.
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="form-group p-1">
                <label htmlFor="lastname">Last Name</label>
                <input
                  type="text"
                  className={
                    errors.lastname
                      ? "form-control is-invalid"
                      : touchedFields.lastname
                      ? dirtyFields.lastname
                        ? "form-control is-valid"
                        : "form-control is-invalid"
                      : "form-control"
                  }
                  id="lastname"
                  name="lastname"
                  {...register("lastname", {
                    required: "Please enter your last name.",
                  })}
                  aria-invalid={errors.lastname ? "true" : "false"}
                />
                <div className="invalid-feedback">
                  Please enter your last name.
                </div>
              </div>
            </div>
          </div>
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

          <div className="row">
            <div className="col-md-6 col-12">
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
                    Password must contain at least one capital letter, one
                    number, and one special character. Should be minimum 8
                    characters long.
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
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
            </div>
          </div>

          <div className="form-group p-1 d-flex flex-column ">
            <label htmlFor="phone">Phone No. (with country code)</label>
            <div className="iti iti--allow-dropdown">
              <div className="iti__flag-container">
                <div
                  className="iti__selected-flag"
                  role="combobox"
                  aria-controls="iti-0__country-listbox"
                  aria-owns="iti-0__country-listbox"
                  aria-expanded="false"
                  tabIndex="0"
                  title="India (भारत): +91"
                  aria-activedescendant="iti-0__item-in"
                >
                  <div className="iti__flag iti__in"></div>
                  <div className="iti__arrow"></div>
                </div>
                <ul
                  className="iti__country-list iti__hide"
                  id="iti-0__country-listbox"
                  role="listbox"
                  aria-label="List of countries"
                >
                  <li
                    className="iti__country iti__standard iti__active"
                    tabIndex="-1"
                    id="iti-0__item-in"
                    role="option"
                    data-dial-code="91"
                    data-country-code="in"
                    aria-selected={true}
                  >
                    <div className="iti__flag-box">
                      <div className="iti__flag iti__in"></div>
                    </div>
                    <span className="iti__country-name">India (भारत)</span>
                    <span className="iti__dial-code">+91</span>
                  </li>
                </ul>
              </div>
              <input
                type="tel"
                className={
                  errors.phone
                    ? "form-control is-invalid"
                    : touchedFields.phone
                    ? dirtyFields.phone
                      ? "form-control is-valid"
                      : "form-control is-invalid"
                    : "form-control"
                }
                id="phone"
                name="phone"
                autoComplete="off"
                {...register("phone", {
                  required: true,
                  pattern: {
                    value: /^(0|[1-9]\d*)(\.\d+)?$/,
                    message: "Only numbers allowed",
                  },
                  validate: (val) => {
                    if (val.length > 11 || val.length < 10) {
                      return "Please enter a valid phone number";
                    }
                  },
                })}
                placeholder="081234 56789"
                data-intl-tel-input-id="0"
              />
            </div>
            <div className="invalid-feedback">
              Please enter a valid phone number.
            </div>
          </div>
          <div className="form-group p-1">
            <label htmlFor="street">Street Address</label>
            <input
              type="text"
              className={
                errors.street
                  ? "form-control is-invalid"
                  : touchedFields.phone
                  ? dirtyFields.phone
                    ? "form-control is-valid"
                    : "form-control is-invalid"
                  : "form-control"
              }
              id="street"
              name="street"
              {...register("street", { required: true })}
              aria-invalid={errors.street ? "true" : "false"}
            />
          </div>
          <div className="form-group p-1">
            <label htmlFor="address2">Address Line 2</label>
            <textarea
              type="text"
              className={"form-control"}
              id="address2"
              name="address2"
              {...register("address2")}
              aria-invalid={errors.address2 ? "true" : "false"}
              autoComplete="off"
            />
          </div>
          <div className="form-group p-1">
            <label htmlFor="city">City</label>
            <input
              type="text"
              className={
                errors.city
                  ? "form-control is-invalid"
                  : touchedFields.city
                  ? dirtyFields.city
                    ? "form-control is-valid"
                    : "form-control is-invalid"
                  : "form-control"
              }
              id="city"
              name="city"
              {...register("city", { required: true })}
              aria-invalid={errors.city ? "true" : "false"}
            />
            <div className="invalid-feedback">Please enter your city.</div>
          </div>
          <div className="form-group p-1">
            <label htmlFor="state">State</label>
            <input
              type="text"
              className={
                errors.state
                  ? "form-control is-invalid"
                  : touchedFields.state
                  ? dirtyFields.state
                    ? "form-control is-valid"
                    : "form-control is-invalid"
                  : "form-control"
              }
              id="state"
              name="state"
              {...register("state", { required: true })}
              aria-invalid={errors.state ? "true" : "false"}
            />
            <div className="invalid-feedback">Please enter your state.</div>
          </div>
          <div className="form-group p-1">
            <label htmlFor="zip">Postal / Zip Code</label>
            <input
              type="text"
              className={
                errors.zip
                  ? "form-control is-invalid"
                  : touchedFields.zip
                  ? dirtyFields.zip
                    ? "form-control is-valid"
                    : "form-control is-invalid"
                  : "form-control"
              }
              id="zip"
              name="zip"
              {...register("zip", { required: true })}
              aria-invalid={errors.zip ? "true" : "false"}
            />
            <div className="invalid-feedback">
              Please enter your postal/zip code.
            </div>
          </div>

          <div className="form-group form-check">
            <input
              type="checkbox"
              className={
                errors.agreement
                  ? "form-check-input is-invalid"
                  : touchedFields.agreement
                  ? dirtyFields.agreement
                    ? "form-check-input is-valid"
                    : "form-check-input is-invalid"
                  : "form-check-input"
              }
              id="terms"
              {...register("agreement", { required: true })}
            />
            <label className="form-check-label" htmlFor="terms">
              I accept the <a href="#">Terms and Conditions</a>
            </label>
            <div className="invalid-feedback">You must accept the terms.</div>
          </div>

          <button type="submit" className="mt-4 d-block w-100 btn btn-primary">
            Submit
          </button>
        </form>
      </div>
      <DevTool control={control} />
    </div>
  );
}

export default App;
