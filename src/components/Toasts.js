import React from "react";
import { useMessageStore } from "../zustand/store";
import { Toast } from "react-bootstrap";

const Toasts = () => {
    const successMsg = useMessageStore((state) => state.successMessage);
    const errorMsg = useMessageStore((state) => state.errorMessage);
    const loadingMsg = useMessageStore((state) => state.loadingMessage);


  return (
    <div id="toasts" className="position-fixed end-0 bottom-0 me-4 mb-4 border-0 rounded-2">
      {successMsg && <Toast
        show={successMsg ? true : false}
        className="toast align-items-center bg-success bg-opacity-75 my-2"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        data-bs-animation="true"
      >
        <div className="d-flex">
          <div className="toast-body">{successMsg}</div>
          <button
            type="button"
            className="btn-close me-2 m-auto"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
      </Toast>}

      
      {errorMsg && <Toast
        show={errorMsg ? true : false}
        className="toast align-items-center bg-danger my-2 bg-opacity-75"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        data-bs-animation="true"
      >
        <div className="d-flex">
          <div className="toast-body">{errorMsg}</div>
          <button
            type="button"
            className="btn-close me-2 m-auto"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
      </Toast>}

      
      {loadingMsg && <Toast
        show={errorMsg ? true : false}
        className="toast align-items-center bg-warning my-2 bg-opacity-75"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        data-bs-animation="true"
      >
        <div className="d-flex">
          <div className="toast-body">
            <span className="spinner-border spinner-border-sm text-warning"></span>
            {loadingMsg? loadingMsg : "Loading..."}
            </div>
          <button
            type="button"
            className="btn-close me-2 m-auto"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
      </Toast>}

      </div>
  );
};

export default Toasts;
