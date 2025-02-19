import { NavLink } from "react-router";
import { useMessageStore, useUniversalStore } from "../zustand/store.js";
import { useEffect } from "react";
import { jsonApi, todoUtils } from "../service/index.js";

const Header = () => {
  const user = useUniversalStore((state) => state.userData);
  const allTodos = useUniversalStore((state) => state.todos);
  const setTodos = useUniversalStore((state) => state.setTodos);
  const isloggedIn = useUniversalStore((state) => state.isAuthenticated);
  const saveLogout = useUniversalStore((state) => state.setUser);
  const { loading, success, failure } = useMessageStore();

  useEffect(()=> {
    if(isloggedIn) {
      loading("Fetching Todos from your account...");
      jsonApi.getAllTodos().then((todos) => {
        const mergedTodos = todoUtils.mergeTodos(allTodos, todos);
        setTodos(mergedTodos);
        success("Todos fetched Successfully !" + " (" + todos.length + " Todos)");
      }).catch((err) => {
        failure(err.message? err.message : "Failed to fetch Todos !");
      });
    }
  }, [isloggedIn]);

  const logOut = () => {
    saveLogout(null);
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
              <span className="">{user?.username? user.username : "N/A"}</span>
            </li>
            <li className="dropdown-item">
              <span className="fw-bold">FullName: </span>
              <span className="">{user?.firstname? user.firstname + " " + user.lastname : "N/A"}</span>
            </li>
            <li className="dropdown-item">
              <span className="fw-bold">Email: </span>
              <span className="">{user?.email? user.email : "N/A"}</span>
            </li>
            <li className="dropdown-item">
              <span className="fw-bold">Phone: </span>
              <span className="">{user?.phone? user.phone : "N/A"}</span>
            </li>
            <li className="dropdown-item">
              <span className="fw-bold">Zip Code: </span>
              <span className="">{user?.zip? user.zip : "N/A"}</span>
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
