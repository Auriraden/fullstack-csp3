import { useState, useEffect } from "react";
import { Table, Container } from "react-bootstrap";

export default function OrdersPage() {

    // UseState for orders
    const [orders, setOrders] = useState([]);

    useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/orders/all`, {
      headers: { 
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Orders Received: ", data);
        if (Array.isArray(data)) {
          setOrders(data); // Update the state with order data (an array of objects)
        }
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, []);

    return (
      <>
        <Container>
          <h1 className="text-center my-4">Orders</h1>
          <Table className="mt-4 text-center" striped bordered hover responsive>
            <thead>
              <tr className="text-center">
                <th>User ID</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th>Purchased On</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order.userID}</td>
                  <td>
                    {order.products.map((product, index) => (
                      <div key={index}>{product.productName}</div>
                    ))}
                  </td>
                  <td>
                    {order.products.map((product, index) => (
                      <div key={index}>{product.quantity}</div>
                    ))}
                  </td>
                  <td>
                    {order.products.map((product, index) => (
                      <div key={index}>{product.subtotal}</div>
                    ))}
                  </td>
                  <td>{order.purchasedOn}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </>
    );
};