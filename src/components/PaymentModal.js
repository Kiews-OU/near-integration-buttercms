import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { buyPost } from "../utils/store";
import { toast } from "react-toastify";
import { NotificationSuccess, NotificationError } from "./Notification";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";

const MIN_PAYMENT = 1;

const PaymentModal = ({ show, onClose, postSlug, postAuthor }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [extraPayment, setExtraPayment] = useState(0);
  const navigate = useNavigate();

  const handleClose = () => {
    onClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Payment required</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3">Read the article for {MIN_PAYMENT} NEAR.</div>
        <div className="mb-3">
          <label htmlFor="extra-payment" className="form-label">
            Extra Payment:
          </label>
          <input
            style={{ maxWidth: "150px" }}
            type="number"
            className="form-control"
            id="extra-payment"
            value={extraPayment}
            min="0"
            onChange={(e) => {
              setExtraPayment(Number(e.target.value));
            }}
          />
        </div>
        <div className="mb-3">Total: {extraPayment + MIN_PAYMENT} NEAR </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="success"
          onClick={() => {
            setIsLoading(true);
            buyPost(postSlug, postAuthor, extraPayment + MIN_PAYMENT)
              .then(() => {
                toast(
                  <NotificationSuccess text="Payment done successfully." />
                );
                navigate(`/blog/${postSlug}`);
              })
              .catch((err) => {
                console.log(err);
                toast(<NotificationError text="Payment unsuccessfull" />);
              })
              .finally(() => {
                setIsLoading(false);
              });
          }}
        >
          {isLoading ? <Loader /> : "Pay"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PaymentModal;
