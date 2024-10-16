import { useState, useEffect } from "react";
import { Container, Row, Col, Table } from 'react-bootstrap';
import ProductList from "./ProductList";

export default function UserView({productsData}){

    const [products, setProducts] = useState([]);

    useEffect(() => {
      const productArr = productsData.map((products) => {
        if (products.isActive === true) {
          return (
            <tr>
              {/* <td>{products._id}</td> */}
              <td>{products.name}</td>
              <td>₱{products.price}</td>
              <ProductList productProp={products} key={products._id} />
            </tr>
          );
        } else {
          return null;
        }
      });

      setProducts(productArr);
    }, [productsData]);

    return (
      <>
        <Container>
          <Row className="justify-content-center align-items-center">
            <Col xs={12} md={6} className="d-flex m-auto">
              <img
                className="img-fluid mb-2"
                src="/tickets.jpg"
                alt="Concert Seat Image"
                style={{ width: "auto", height: "auto" }}
              />
            </Col>
            <Col xs={12} md={6} className="d-flex">
              <img
                className="img-fluid mb-2"
                src="/merch.jpg"
                alt="Official Merchandise List"
                style={{ width: "auto", height: "auto" }}
              />
            </Col>
          </Row>
          <Row>
            <h2 className="text-center mt-2">Products List</h2>
            <Table className="mt-2" striped bordered hover responsive>
              <thead>
                <tr className="text-center">
                  {/* <th>ID</th> */}
                  <th>Name</th>
                  <th>Price</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody className="text-center">{products}</tbody>
            </Table>
          </Row>
        </Container>
      </>
    );
}