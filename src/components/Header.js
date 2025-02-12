import { useState } from "react";
import { auth } from "../service.js/config.firebase";
import { onAuthStateChanged } from "firebase/auth";
import { NavLink } from "react-router";

const Header = () => {
  const [user, setUser] = useState(auth.currentUser);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser((prevUser) => user);
    } else {
      setUser((prevUser) => null);
    }
  });

  return (
    <div className="bg-info px-3 py-2 d-flex">
      <div id="authStateInHeader" className="me-3 my-auto">
        Auth State : {user ? "Logged in as : " + user.email : "Not logged in"}
      </div>
      {user ? null : (
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
