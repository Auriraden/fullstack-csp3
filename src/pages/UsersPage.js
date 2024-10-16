import { useState, useEffect } from "react";
import { Table, Container } from "react-bootstrap";
import MakeAdmin from "../components/MakeAdmin";

export default function UsersPage() {
  // useState for Users
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/users/all`, {
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
        console.log("Users Received: ", data);
        if (Array.isArray(data)) {
          setUsers(data); // Update the state with user data (an array of objects)
        }
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  return (
    <>
      <Container>
        <h1 className="text-center my-4">Users</h1>
        <Table className="mt-4 text-center" striped bordered hover responsive>
          <thead>
            <tr className="text-center">
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile Number</th>
              <th>Admin Status</th>
              <th colSpan="2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>
                  {user.firstName} {user.lastName}
                </td>
                <td>{user.email}</td>
                <td>{user.mobileNo}</td>
                <td
                  className={user.isAdmin ? "text-success" : "text-danger"}
                >
                  {user.isAdmin ? "Admin" : "Not an Admin"}
                </td>
                <td>
                    <MakeAdmin users={user._id} isAdmin={user.isAdmin} /></td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
}
