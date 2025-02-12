import { useState } from "react";
import { auth } from "../service.js/config.firebase";
import { onAuthStateChanged } from "firebase/auth";
import { NavLink } from "react-router";
import { authCustomApi } from "../service.js";

const Header = () => {
  const [user, setUser] = useState(authCustomApi.returnCurrentUser());

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser((prevUser) => user);
    } else {
      setUser((prevUser) => null);
    }
  });

  const logoutHandler = (e) => {
    e.preventDefault();
    authCustomApi.logout();
  };

  return (
    <div className="bg-info px-3 py-2 d-flex">
      <div id="authStateInHeader" className="me-3 my-auto">
        <span className="fw-bold">Auth State : </span>
        {user
          ? "Logged in with email id (" + user.email + ")"
          : "Not logged in"}
      </div>
      {user ? (
        <button
          className="btn btn-dark my-auto ms-auto"
          onClick={logoutHandler}
        >
          LOGOUT
        </button>
      ) : (
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "btn btn-success my-auto ms-auto"
              : "btn btn-primary my-auto ms-auto"
          }
          to="/login"
        >
          LOGIN
        </NavLink>
      )}
    </div>
  );
};

export default Header;
