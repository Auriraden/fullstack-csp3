import { useState, useEffect } from "react";
import { Table, Container } from "react-bootstrap";

import CreateProduct from "./CreateProduct";
import EditProducts from "./EditProducts";
import ArchiveProducts from "./ArchiveProduct";

export default function AdminView ({ productsData, fetchData }) {

    const [products, setProducts] = useState([]);

    useEffect(() => {
      const productsArr = productsData.map((products) => {
        return (
          <tr>
            {/* <td>{products._id}</td> */}
            <td>{products.name}</td>
            <td>{products.description}</td>
            <td>₱{products.price}</td>
            <td className={products.isActive ? "text-success" : "text-danger"}>
              {products.isActive ? "Available" : "Unavailable"}
            </td>
            <td>
              <EditProducts products={products._id} fetchData={fetchData} />
            </td>
            <td>
              <ArchiveProducts
                products={products._id}
                isActive={products.isActive}
                fetchData={fetchData}
              />
            </td>
          </tr>
        );
      });

      setProducts(productsArr);
    }, [productsData]);

    return (
      <>
        <Container>
          <h1 className="text-center my-4">Admin Dashboard</h1>
          <CreateProduct product={products} className="justify-content-center align-items-center" fetchData={fetchData} />
          <Table className="mt-4" striped bordered hover responsive>
              <thead>
                  <tr className="text-center">
                      {/* <th>ID</th> */}
                      <th>Name</th>
                      <th>Description</th>
                      <th>Price</th>
                      <th>Availability</th>
                      <th colSpan="2">Actions</th>
                  </tr>
              </thead>
              <tbody>{products}</tbody>
          </Table>
        </Container>
      </>
    );
}
