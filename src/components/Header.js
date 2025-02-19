import { NavLink } from "react-router";
import { useUniversalStore } from "../zustand/store.js";

const Header = () => {
  // const [user, setUser] = useState(authCustomApi.returnCurrentUser());
  const user = useUniversalStore((state) => state.userData);
  const isloggedIn = useUniversalStore((state) => state.isAuthenticated);
  const saveLogout = useUniversalStore((state) => state.setUser);

  const logOut = () => {
    // localStorage.removeItem("authUser");
    // localStorage.setItem("isloggedIn", 'false');
    saveLogout();
  };

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
      <NavLink
        className={({ isActive }) =>
          isActive
            ? "btn btn-dark me-3 my-auto"
            : "btn btn-outline-dark me-3 my-auto"
        }
        to="/form"
      >
        Form
      </NavLink>
      {isloggedIn && (
        <div className="dropdown">
          <button
            className="btn btn-dark dropdown-toggle me-3 my-auto"
            type="button"
            id="dropdownMenuButton"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Profile
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <li className="dropdown-item">
              <span className="fw-bold">Username: </span>
              <span className="">{user.username? user.username : "N/A"}</span>
            </li>
            <li className="dropdown-item">
              <span className="fw-bold">FullName: </span>
              <span className="">{user.firstname? user.firstname + " " + user.lastname : "N/A"}</span>
            </li>
            <li className="dropdown-item">
              <span className="fw-bold">Email: </span>
              <span className="">{user.email? user.email : "N/A"}</span>
            </li>
            <li className="dropdown-item">
              <span className="fw-bold">Phone: </span>
              <span className="">{user.phone? user.phone : "N/A"}</span>
            </li>
            <li className="dropdown-item">
              <span className="fw-bold">Zip Code: </span>
              <span className="">{user.zip? user.zip : "N/A"}</span>
            </li>
          </ul>
        </div>
      )}
      <div id="authStateInHeader" className="me-3 my-auto d-none d-md-block">
        <span className="fw-bold">Auth State : </span>
        {isloggedIn
          ? "Logged in with email id (" + user.email + ")"
          : "Not logged in"}
      </div>
      {isloggedIn ? (
        <button className="btn btn-dark my-auto ms-auto" onClick={logOut}>
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
