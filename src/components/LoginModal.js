import React from "react";
import { Button, Modal } from "react-bootstrap";
import { login } from "../utils/near";

const LoginModal = ({ show, onClose }) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Login Required</Modal.Title>
      </Modal.Header>
      <Modal.Body>In order to see the post login is required.</Modal.Body>
      <Modal.Footer>
        <Button
          variant="success"
          onClick={() => {
            login();
          }}
        >
          Login
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LoginModal;
