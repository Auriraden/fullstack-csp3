import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import Swal from "sweetalert2";


export default function ProductCards({ productProp }) {
  const { _id, name, description, price } = productProp;

  // State to control the visibility of the modal
  const [showModal, setShowModal] = useState(false);
  // State for quantity Control
  const [quantity, setQuantity] = useState(1);

  // Function for Product Checkouts
  function checkout(e){
    e.preventDefault();
    let token = localStorage.getItem("token");

      fetch(`${process.env.REACT_APP_API_URL}/orders/checkout/${_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          quantity: quantity
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            console.log(data);
            Swal.fire({
              icon: "success",
              title: "Product Added to Cart",
            })
            closeModal();
          } else {
            Swal.fire({
              icon: "error",
              title: "Error",
            })
          }
        });
    }

  // Function to open the modal
  const openModal = () => {
    setShowModal(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="text-center">
      {/* Button to open the modal */}
      <Button variant="primary" onClick={openModal}>
        Details
      </Button>
      {/* Modal for displaying product details */}
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Product Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>Name:</strong> {name}
          </p>
          <p>
            <strong>Description:</strong> {description}
          </p>
          <p>
            <strong>Price:</strong> ₱{price}
          </p>
          {/* Quantity Form In modal for checkout */}
          <Form>
            <Form.Group>
              <Form.Label>
                <strong>Quantity</strong>
              </Form.Label>
              <Form.Control
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
                min="1"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={checkout}>
            Add to Cart
          </Button>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
