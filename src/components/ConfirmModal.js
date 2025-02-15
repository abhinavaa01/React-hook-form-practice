import React from "react";
import { Modal } from "react-bootstrap";
import { useModalStore } from "../zustand/store";

const ConfirmModal = () => {
  const show = useModalStore((state) => state.visiblity);
  const content = useModalStore((state) => state.modalContent);
  const hide = useModalStore((state) => state.hideModal);
  const confirm = useModalStore((state) => state.confirm);

  const confirmHandler = () => {
    confirm(content.data);
    hide();
  };

  return (
    <Modal show={show} onHide={hide}>
      <div className="modal-header">
        <h5 className="modal-title">{content.title}</h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
          onClick={hide}
        ></button>
      </div>
      <div className="modal-body">
        <p>{content.text}</p>
      </div>
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-secondary"
          data-bs-dismiss="modal"
          onClick={hide}
        >
          Cancel
        </button>
        <button
          type="button"
          className="btn btn-warning"
          onClick={confirmHandler}
        >
          Confirm
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
