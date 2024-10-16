import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";

export default function MakeAdmin({ users, isAdmin }) {

    const [ user, setUser ] = useState ([]);

    const fetchData = () => {
        fetch(`${process.env.REACT_APP_API_URL}/users/all`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("Users Received: ", data);
            setUser(data); 
          });
    };
    useEffect(() => {
      
        fetchData();

    }, []);


    /* -------------------- Function for Making User an Admin ------------------- */
    const AdminToggle = (userId) => {

        console.log (userId);
        fetch(`${process.env.REACT_APP_API_URL}/users/${userId}/admin`, {
            method: "PUT",
            headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
            if (data) {
                Swal.fire({
                title: "Success",
                icon: "success",
                text: "User Successfully Updated",
                });
                fetchData();
            } else {
                Swal.fire({
                title: "Something went wrong",
                icon: "error",
                text: "Please try again later.",
                });
                fetchData();
            }
        });
    }

    /* ------------------- Function for making user Non-Admin ------------------- */

    const NonAdminToggle = (userId) => {
      fetch(`${process.env.REACT_APP_API_URL}/users/${userId}/nonadmin`, {
            method: "PUT",
            headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
            if (data) {
                Swal.fire({
                title: "Success",
                icon: "success",
                text: "User Successfully Updated",
                });
                fetchData();
            } else {
                Swal.fire({
                title: "Something went wrong",
                icon: "error",
                text: "Please try again later.",
                });
                fetchData();
            }
        });
    };

    return (
      <>
        {isAdmin ? (
          <Button variant="danger" onClick={() => NonAdminToggle(users)}>
            Make Non-Admin
          </Button>
        ) : (
          <Button variant="success" onClick={() => AdminToggle(users)}>
            Make Admin
          </Button>
        )}
      </>
    );

}