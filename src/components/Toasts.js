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
          <div className="toast-body fw-bold text-white">{successMsg}</div>
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
          <div className="toast-body fw-bold text-white">{errorMsg}</div>
          <button
            type="button"
            className="btn-close me-2 m-auto"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
      </Toast>}


      {loadingMsg && <Toast
        show={loadingMsg ? true : false}
        className="toast align-items-center bg-warning my-2 bg-opacity-75"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        data-bs-animation="true"
      >
        <div className="d-flex">
          <div className="toast-body fw-bold d-flex flex-row">
            <span className="spinner-border spinner-border-sm text-secondary my-auto"></span>
            <span className="my-auto ms-1">{loadingMsg? loadingMsg : "Loading..."}</span>
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
