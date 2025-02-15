import React from "react";
import { Modal } from "react-bootstrap";

const ConfirmModal = () => {
  const show = useModalStore((state) => state.visiblity);
  const content = useModalStore((state) => state.modalContent);
  const hide = useModalStore((state) => state.hideModal);
  return (
    <div>
      <Modal show={show} onHide={hide}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Modal title</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
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
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Confirm
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ConfirmModal;
