import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import UserContext from "../UserContext";
import Swal from "sweetalert2";

export default function Logout() {
  const { unSetUser, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {

    Swal.fire({
      title: "Logout",
      text: "Are you sure you want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, log me out",
      cancelButtonText: "Cancel",
    }).then((result) => {

      if (result.isConfirmed) {
        // User confirmed the logout
        unSetUser();
        setUser({
          id: null,
          isAdmin: null,
        });
        Swal.fire({
          title: "Logged Out",
          text: "You have been successfully logged out.",
          icon: "success",
        });

        // Navigate to the home page after successful logout
        navigate("/");
      } else {
        // User canceled the logout; Navigate to the home page
        navigate("/");
      }
    });
  }, [unSetUser, setUser, navigate]);

  return null;
}
