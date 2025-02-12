import { useCallback, useEffect, useState } from "react";
import ExistingLogin from "./AuthComponents/ExistingLogin";
import NewSignup from "./AuthComponents/NewSignup";
import { authCustomApi } from "../service.js";
import { useNavigate } from "react-router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../service.js/config.firebase.js";

const Login = () => {
  const [existing, setExisting] = useState((prev) => true);
  const navigate = useNavigate();
  const [user, setUser] = useState(() => authCustomApi.returnCurrentUser());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => { // Rename to authUser to avoid confusion
      setUser(authUser);
      setIsLoading(false); // Authentication status is known
    });

    return () => unsubscribe(); // Clean up listener - VERY IMPORTANT
  }, []); // Empty dependency array - runs only once

  useEffect(() => {
    if (!isLoading) { // Only check and redirect *after* loading is complete
      if (user?.email) {
        navigate(-1);
      }
    }
  }, [user, navigate, isLoading]);

  if (user?.email) {
    setTimeout(() => {
      navigate(-1);
    }, 2000);
  }

  const toggleForm = useCallback((state) => {
      setExisting(state);
  }, []);

  console.log("render");

  return (
    <div className="d-flex">
      <div className="bg-white shadow mx-auto col-8 col-md-6 fixed-max-width my-5 p-3 rounded-3">
        <div id="chooseExisting" className="d-flex justify-content-center mb-2">
          <h3>{existing ? "LOG IN" : "SIGN UP"}</h3>
        </div>
        <div id="login-form text-center m-auto">
        {isLoading ? (
                        <div className="spinner-grow text-primary m-auto"></div>
                    ) : (
                        existing ? <ExistingLogin /> : <NewSignup />
                    )}
        </div>

        {user?.email ? (
          <span className="text-success" role="alert">
            Already logged in. Redirecting back in 2 seconds.
          </span>
        ) : null}

        {existing ? (
          <span>
            Don't have an account?{" "}
            <span
              onClick={(e) => toggleForm(false)}
              href="#"
              className="text-primary text-decoration-underline mx-1"
              role="button"
            >
              Sign Up
            </span>
          </span>
        ) : (
          <span>
            Already have an account?{" "}
            <span
              onClick={(e) => toggleForm(true)}
              href="#"
              className="text-primary text-decoration-underline mx-1"
              role="button"
            >
              Log In
            </span>
          </span>
        )}
      </div>
    </div>
  );
};

export default Login;
