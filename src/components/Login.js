import { useState } from "react";
import ExistingLogin from "./AuthComponents/ExistingLogin";
import NewSignup from "./AuthComponents/NewSignup";

const Login = () => {
  const [existing, setExisting] = useState((prev) => true);

  return (
    <div className="d-flex">
      <div className="bg-white shadow mx-auto col-8 col-md-6 fixed-max-width my-5 p-3 rounded-3">
        <div id="chooseExisting" className="d-flex justify-content-center mb-4">
          <button
            className={existing ? "btn btn-primary rounded-0 col-6" : "btn btn-outline-primary rounded-0 col-6"}
            onClick={(e) => setExisting((prev) => true)}
          >
            LOG IN
          </button>
          <button
            className={
              !existing ? "btn btn-primary rounded-0 col-6" : "btn btn-outline-primary rounded-0 col-6"
            }
            onClick={(e) => setExisting((prev) => false)}
          >
            SIGN UP
          </button>
        </div>
        <div id="login-form">
          {existing ? <ExistingLogin /> : <NewSignup />}
        </div>
      </div>
    </div>
  );
};

export default Login;
