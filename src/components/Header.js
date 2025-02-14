import { NavLink } from "react-router";
import { useAuthStore } from "../zustand/store.js";

const Header = () => {
  // const [user, setUser] = useState(authCustomApi.returnCurrentUser());
  const user = useAuthStore((state) => state.userData);
  const loggedIn = useAuthStore((state) => state.isAuthenticated);
  const saveLogout = useAuthStore((state) => state.saveLogout);

  const logOut = () => {
    // localStorage.removeItem("authUser");
    // localStorage.setItem("isloggedIn", 'false');
    saveLogout();
  }

  return (
    <div className="bg-info px-3 py-2 d-flex">
      <NavLink
        className={({ isActive }) =>
          isActive
            ? "btn btn-dark me-3 my-auto"
            : "btn btn-outline-dark me-3 my-auto"
        }
        to="/"
      >
        Home
      </NavLink>
      <div id="authStateInHeader" className="me-3 my-auto">
        <span className="fw-bold">Auth State : </span>
        {loggedIn
          ? "Logged in with email id (" + user.email + ")"
          : "Not logged in"}
      </div>
      {loggedIn ? (
        <button
          className="btn btn-dark my-auto ms-auto"
          onClick={logOut}
        >
          LOGOUT
        </button>
      ) : (
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "btn btn-dark my-auto ms-auto"
              : "btn btn-outline-dark my-auto ms-auto"
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
