import { useState } from "react";
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

  if (user?.email) {
    setTimeout(() => {
      navigate(-1);
    }, 2000);
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser((prevUser) => user);
    } else {
      setUser((prevUser) => null);
    }
  });

  return (
    <div className="d-flex">
      <div className="bg-white shadow mx-auto col-8 col-md-6 fixed-max-width my-5 p-3 rounded-3">
        <div id="chooseExisting" className="d-flex justify-content-center mb-4">
          <button
            className={
              existing
                ? "btn btn-primary rounded-0 col-6"
                : "btn btn-outline-primary rounded-0 col-6"
            }
            onClick={(e) => setExisting((prev) => true)}
          >
            LOG IN
          </button>
          <button
            className={
              !existing
                ? "btn btn-primary rounded-0 col-6"
                : "btn btn-outline-primary rounded-0 col-6"
            }
            onClick={(e) => setExisting((prev) => false)}
          >
            SIGN UP
          </button>
        </div>
        <div id="login-form">
          {existing ? <ExistingLogin /> : <NewSignup />}
        </div>

        {user?.email ? (
          <span className="text-success" role="alert">
            Already logged in. Redirecting back in 2 seconds.
          </span>
        ) : null}
      </div>
    </div>
  );
};

export default Login;
