import { Button, Modal, Form } from "react-bootstrap";
import { useState } from "react";
import Swal from "sweetalert2";

export default function EditProducts({ products, fetchData }){

    /* ------------------ State for productId for the fetch URL ----------------- */
    const [productId, setProductId] = useState('');

    /* ------------------------------- Forms State ------------------------------ */
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);

    /* -------------- State for editProduct Modals to open/close -------------- */
    const [showEdit, setShowEdit] = useState(false);

    /* ----------------------- Function for Opening Modal ----------------------- */
    const openEdit = (productId) => {

        // to still get the actual data from the form
        fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`)
        .then(res => res.json())
        .then(data => {
            // Populate all the input values with product info
            // Once modal is opened, the data is already populated with these variables
            setProductId(data._id);
            setName(data.name);
            setDescription(data.description);
            setPrice(data.price);
        });
        // Then open the modal
        setShowEdit(true);
    }

    /* --------------------- Function for Editing a product -------------------- */
    const editProduct = (e, productId) => {
        e.preventDefault();

        fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`, {
            method: "PUT",
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                // This is from the states above
                name: name, 
                description: description,
                price: price
            })
        })
        .then(res => res.json())
        .then(data => {
            if(data === true){
                Swal.fire({
                    title:"Success!",
                    icon: 'success',
                    text: 'Product Successfully Updated'
                })
                closeEdit();
                fetchData();
            } else{
                Swal.fire({
                    title:"Error!",
                    icon: 'error',
                    text: 'Please try again'
                })
                closeEdit();
                fetchData();
            }
        });
    }

    /* ----------------------- Function for Closing Modal ----------------------- */
    const closeEdit = () => {
        setShowEdit(false);
        setName("");
        setDescription("");
        setPrice(0);
        };

    return (
      <>
        <div className="d-flex justify-content-center align-items-center">
          <Button variant="primary" onClick={() => openEdit(products)}>
            Edit
          </Button>
        </div>
        {/*EDIT MODAL*/}
        <Modal show={showEdit} onHide={closeEdit}>
          <Form onSubmit={(e) => editProduct(e, productId)}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={closeEdit}>
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

    
