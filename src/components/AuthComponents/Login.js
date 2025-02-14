import { useCallback, useEffect, useState } from "react";
import ExistingLogin from "./ExistingLogin.js";
import NewSignup from "./NewSignup.js";
import { Link, useNavigate } from "react-router";
import { useAuthStore } from "../../zustand/store.js";

const Login = () => {
  const [existing, setExisting] = useState((prev) => true);
  const user = useAuthStore((state) => state.userData);
  const navigate = useNavigate();

  useEffect(()=> {
    if(user?.email) {
      setTimeout(() => {
        navigate(-1);
      }, 3000);
    }
  });

  const toggleForm = useCallback((state) => {
    setExisting(state);
  }, []);

  return (
    <div className="d-flex">
      <div className="bg-white shadow mx-auto col-8 col-md-6 fixed-max-width my-5 p-3 rounded-3">
        <div id="chooseExisting" className="d-flex justify-content-center mb-2">
          <h3>{existing ? "LOG IN" : "SIGN UP"}</h3>
        </div>
        <div id="login-form text-center m-auto">
          {existing ? (
            <ExistingLogin />
          ) : (
            <NewSignup />
          )}
        </div>

        {user?.email ? (
          <div className="text-success d-flex" role="alert">
            <div className="spinner-border spinner-border-sm my-auto me-2" role="status"></div>
            <div className="my-auto">Authenticated User found! Redirecting back in 3 seconds.</div><br />
          </div>
        ) : null}

        {existing ? <div>Forgot password ?{" "} <Link to="/resetpassword">Reset Now</Link></div> : null}

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
