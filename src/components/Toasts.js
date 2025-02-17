import React from "react";
import { useMessageStore } from "../zustand/store";
import { Toast } from "react-bootstrap";

const Toasts = () => {
    const successMsg = useMessageStore((state) => state.successMessage);
    const errorMsg = useMessageStore((state) => state.errorMessage);
    const loadingMsg = useMessageStore((state) => state.loadingMessage);


  return (
    <div id="toasts" className="position-fixed end-0 bottom-0 me-4 mb-4 bg-success border-0 rounded-2">
      {successMsg && <Toast
        show={successMsg ? true : false}
        class="toast align-items-center bg-success bg-opacity-75"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        data-bs-animation="true"
      >
        <div class="d-flex">
          <div class="toast-body">{successMsg}</div>
          <button
            type="button"
            class="btn-close me-2 m-auto"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
      </Toast>}
    </div>
  );
};

export default Toasts;
