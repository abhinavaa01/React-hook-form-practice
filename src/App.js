import { useCallback, useState } from "react";
import "./App.css";
import { useForm } from "react-hook-form";

function App() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
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
          className="needs-validation text-start"
        >
          <div className="form-group p-1">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control is-valid"
              id="username"
              name="username"
              required={true}
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
                  className="form-control"
                  id="firstname"
                  name="firstname"
                  required={true}
                />
                <div className="invalid-feedback">
                  Please enter your first name.
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="form-group p-1">
                <label htmlFor="lastname">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastname"
                  name="lastname"
                  required={true}
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
              className="form-control"
              name="email"
              id="email"
              required={true}
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
                    className="form-control"
                    name="password"
                    id="password"
                    required={true}
                  />
                  <i
                    className="position-absolute top-50 end-0 me-2"
                    id="togglePassword"
                    style={{ transform: "translateY(-50%)", cursor: "pointer" }}
                  >
                    🙈
                  </i>
                  <div className="invalid-feedback">
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
                  className="form-control"
                  name="confirmPassword"
                  id="confirmPassword"
                  required={true}
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
                className="form-control"
                id="phone"
                name="phone"
                required={true}
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
              className="form-control"
              id="street"
              name="street"
              required={true}
            />
          </div>
          <div className="form-group p-1">
            <label htmlFor="address2">Address Line 2</label>
            <input
              type="text"
              className="form-control"
              id="address2"
              name="address2"
              autoComplete="off"
            />
          </div>
          <div className="form-group p-1">
            <label htmlFor="city">City</label>
            <input
              type="text"
              className="form-control"
              id="city"
              name="city"
              required={true}
            />
            <div className="invalid-feedback">Please enter your city.</div>
          </div>
          <div className="form-group p-1">
            <label htmlFor="state">State</label>
            <input
              type="text"
              className="form-control"
              id="state"
              name="state"
              required={true}
            />
            <div className="invalid-feedback">Please enter your state.</div>
          </div>
          <div className="form-group p-1">
            <label htmlFor="zip">Postal / Zip Code</label>
            <input
              type="text"
              className="form-control"
              id="zip"
              name="zip"
              required={true}
            />
            <div className="invalid-feedback">
              Please enter your postal/zip code.
            </div>
          </div>

          <div className="form-group form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="terms"
              required={true}
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
    </div>
  );
}

export default App;
