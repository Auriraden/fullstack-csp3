import { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import UserContext from "../UserContext";
import { useNavigate, Navigate } from "react-router-dom";

export default function Profile() {
  const { user } = useContext(UserContext);

  const [details, setDetails] = useState({});

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        })
        .then((res) => res.json())
        .then((data) => {
            if (typeof data._id !== "undefined") {
            console.log(data);
            setDetails(data);
            }
        });
    }, []);

  return user.id === null ? (
    <Navigate to="/login" />
  ) : (
    <>
      <Container>
        <Row className="text-center">
          <Col className="p-5">
            <h1 className="my-5">Profile</h1>
            <img
              src="http://placekitten.com/g/200/200"
              alt="Placeholder Photo"
              style={{ borderRadius: "50%" }}
            ></img>
            {/*<h2 className="mt-3">James Dela Cruz</h2>*/}
            <h2 className="mt-3">{`${details.firstName} ${details.lastName}`}</h2>
            <hr />
            <h4>Contacts</h4>
            <ul className="list-unstyled">
              {/*<li>Email: jamesDC@mail.com</li>*/}
              <li>Email: {details.email}</li>
              {/*<li>Mobile No: 09123456789</li>*/}
              <li>Mobile No: {details.mobileNo}</li>
            </ul>
          </Col>
        </Row>
        <Row>
          <h2 className="text-center mt-2">Cart</h2>
          <Table className="mt-2" striped bordered hover responsive>
            <thead>
              <tr className="text-center">
                <th>Name</th>
                <th>Quantity</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {details.orders &&
                details.orders.map((order, index) => (
                  <tr key={index}>
                    <td>{order.productName}</td>
                    <td>{order.quantity}</td>
                    <td>₱{order.subtotal}</td>
                  </tr>
                ))}
            </tbody>
            <tfoot>
              <tr className="text-center">
                <td colSpan="2" className="text-end">
                  <strong>Total Amount:</strong>
                </td>
                <td>
                  ₱
                  {details.orders &&
                    details.orders.reduce(
                      (total, order) => total + order.subtotal,
                      0
                    )}
                </td>
              </tr>
            </tfoot>
          </Table>
        </Row>
      </Container>
    </>
  );

}