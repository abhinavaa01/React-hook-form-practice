import React from "react";
import { Modal } from "react-bootstrap";
import { useMessageStore, useModalStore, useUniversalStore } from "../../zustand/store";
import { jsonApi, todoUtils } from "../../service";

const ConfirmModal = () => {
  const allTodos = useUniversalStore((state)=> state.todos);
  const setTodos = useUniversalStore((state)=> state.setTodos);
  const emailId = useUniversalStore((state)=> state.userData?.email);
  const show = useModalStore((state) => state.visiblity);
  const content = useModalStore((state) => state.modalContent);
  const hide = useModalStore((state) => state.hideModal);
  const success = useMessageStore((state) => state.success);
  const failure = useMessageStore((state) => state.failure);
  const loading = useMessageStore((state) => state.loading);

  const deleteLocally = () => {
    const newTodos = todoUtils.removeTodo(allTodos, content.data);
    setTodos(newTodos);
  }

  const confirmHandler = () => {
    loading("Deleting Todo...");
        deleteLocally();
    jsonApi
      .deleteTodo(content.data.id, emailId)
      .then((res) => {
        success("Todo Deleted from server and local storage Successfully !");
      })
      .catch((err) => {
        failure(err.message? err.message + ", Deleting from local storage" : "Failed to delete Todo, deleted from localStorage");
      });
    hide();
  };

  return (
    <Modal show={show} onHide={hide} centered>
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
