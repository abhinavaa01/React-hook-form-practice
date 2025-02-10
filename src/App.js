import { useCallback, useState } from "react";
import "./App.css";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

function App() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { touchedFields, errors },
    control
  } = useForm();
  const values = watch([
    "username",
    "firstname",
    "lastname",
    "email",
    "password",
    "confirmPassword",
    "street",
    "address2",
    "city",
    "state",
    "zip",
  ]);
  const onSubmit = (data) => {
    console.log(data);
    // console.log("fs:", formState);
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
                touchedFields.username
                  ? errors.username || !values.username
                    ? "form-control is-invalid"
                    : "form-control is-valid"
                  : "form-control"
              }
              id="username"
              name="username"
              {...register("username", {
                required: "Username cannot be blank or have spaces.",
              })}
              aria-invalid={errors.username ? "true" : "false"}
            />
            <div className="invalid-feedback">{errors.username?.message}</div>
            <div className="valid-feedback">Looks Good</div>
          </div>

          <div className="row">
            <div className="col-md-6 col-12">
              <div className="form-group p-1">
                <label htmlFor="firstname">First Name</label>
                <input
                  type="text"
                  className={
                    touchedFields.firstname
                      ? errors.firstname
                        ? "form-control is-invalid"
                        : "form-control is-valid"
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
                <div className="invalid-feedback">Please enter your First name.</div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="form-group p-1">
                <label htmlFor="lastname">Last Name</label>
                <input
                  type="text"
                  className={
                    touchedFields.lastname
                      ? errors.lastname
                        ? "form-control is-invalid"
                        : "form-control is-valid"
                      : "form-control"
                  }
                  id="lastname"
                  name="lastname"
                  {...register("lastname", { required: "Please enter your last name." })}
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
                touchedFields.email
                  ? errors.email
                    ? "form-control is-invalid"
                    : "form-control is-valid"
                  : "form-control"
              }
              name="email"
              {...register("email", { required: "Please enter a valid email address.", pattern: {
                value: /^[a-zA-Z0-9. !#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\. [a-zA-Z0-9-]+)*$/, message: "Please enter a valid email address."
              } })}
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
                    type="text"
                    className={
                      touchedFields.password
                        ? errors.password
                          ? "form-control is-invalid"
                          : "form-control is-valid"
                        : "form-control"
                    }
                    name="password"
                    {...register("password", { required: true, pattern :{
                      value: `/?=.*?[A-Z]/`, message: "At least One capital letter should be present."
                    } })}
                    aria-invalid={errors.password ? "true" : "false"}
                    id="password"
                  />
                  <i
                    className="position-absolute top-50 end-0 me-2"
                    id="togglePassword"
                    style={{ transform: "translateY(-50%)", cursor: "pointer" }}
                  >
                    🙈
                  </i>
                  <div className="invalid-feedback">
                    {errors.password?.message}
                    Password must contain at least one capital letter, one
                    number, and one special character.
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
                    touchedFields.confirmPassword
                      ? errors.confirmPassword
                        ? "form-control is-invalid"
                        : "form-control is-valid"
                      : "form-control"
                  }
                  name="confirmPassword"
                  {...register("confirmPassword", { required: true })}
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
                  touchedFields.phone
                    ? errors.phone
                      ? "form-control is-invalid"
                      : "form-control is-valid"
                    : "form-control"
                }
                id="phone"
                name="phone"
                autoComplete="off"
                placeholder="081234 56789"
                data-intl-tel-input-id="0"
              />
            </div>
            <div className="invalid-feedback">
              Please enter a valid phone number.
            </div>
          </div>
          <h5>Address</h5>
          <div className="form-group p-1">
            <label htmlFor="street">Street Address</label>
            <input
              type="text"
              className={
                touchedFields.street
                  ? errors.street
                    ? "form-control is-invalid"
                    : "form-control is-valid"
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
            <input
              type="text"
              className={
                touchedFields.address2
                  ? errors.address2
                    ? "form-control is-invalid"
                    : "form-control is-valid"
                  : "form-control"
              }
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
                touchedFields.city
                  ? errors.city
                    ? "form-control is-invalid"
                    : "form-control is-valid"
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
                touchedFields.state
                  ? errors.state
                    ? "form-control is-invalid"
                    : "form-control is-valid"
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
                touchedFields.zip
                  ? errors.zip
                    ? "form-control is-invalid"
                    : "form-control is-valid"
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
            <input type="checkbox" className={touchedFields.agreement? errors.agreement? "form-check-input is-invalid" : "form-check-input is-valid" : "form-check-input"} id="terms" {...register("agreement", { required: true})} />
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
