import { Button } from "react-bootstrap";
import Swal from "sweetalert2";

export default function ArchiveProducts({ products, isActive, fetchData }){

    /* ---------------------- Function for Toggling Archive --------------------- */
    const archiveToggle = (productId) => {
        
        console.log(productId);

        fetch(`${process.env.REACT_APP_API_URL}/products/${productId}/archive`, {
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
                text: "Product successfully disabled",
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

    /* -------------------- Function for Activating a Product ------------------- */
    const activateToggle = (productId) => {
      fetch(
        `${process.env.REACT_APP_API_URL}/b1/products/${productId}/activate`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            Swal.fire({
              title: "Success",
              icon: "success",
              text: "Product successfully activated",
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
        {isActive ? (
          <Button
            variant="danger"
            onClick={() => archiveToggle(products)}
          >
            Archive
          </Button>
        ) : (
          <Button
            variant="success"
            onClick={() => activateToggle(products)}
          >
            Activate
          </Button>
        )}
      </>
    );
}