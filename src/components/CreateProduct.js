import { Button, Modal, Form } from "react-bootstrap";
import { useState } from "react";
import Swal from "sweetalert2";

export default function CreateProduct({ product, fetchData }) {
    
    /* ------------------------------- Forms State ------------------------------ */
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);

    /* -------------- State for createProduct Modals to open/close -------------- */
    const [showCreate, setShowCreate] = useState(false);

    /* ----------------------- Function for Opening Modal ----------------------- */
    const openCreate = () => {
        setShowCreate(true);
        setName("");
        setDescription("");
        setPrice(0);
        };

    /* --------------------- Function for Creating a product -------------------- */
    function createProduct(e) {
      //prevent submit event's default behavior
      e.preventDefault();

      let token = localStorage.getItem("token");

      fetch(`${process.env.REACT_APP_API_URL}/products/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: name,
          description: description,
          price: price,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            console.log(data);
            Swal.fire({
              icon: "success",
              title: "Product Added",
            })
            closeCreate();
            fetchData();
          } else {
            Swal.fire({
              icon: "error",
              title: "Unsuccessful Product Creation",
            })
            closeCreate();
            fetchData();
          }
        });

      setName("");
      setDescription("");
      setPrice(0);
    }

    /* ----------------------- Function for Closing Modal ----------------------- */
    const closeCreate = () => {
        setShowCreate(false);
        setName("");
        setDescription("");
        setPrice(0);
        };

    return (
      <>
        <div className="d-flex justify-content-center align-items-center">
          <Button variant="primary" onClick={() => openCreate(product)}>
            Create a Product
          </Button>
        </div>
        {/*CREATE MODAL*/}
        <Modal show={showCreate} onHide={closeCreate}>
          <Form onSubmit={(e) => createProduct(e)}>
            <Modal.Header closeButton>
              <Modal.Title>Add Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  required
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Description"
                  required
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Price"
                  required
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={closeCreate}>
                Close
              </Button>
              <Button variant="success" type="submit">
                Submit
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </>
    );
}