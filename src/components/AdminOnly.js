import { useContext } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "../UserContext";

export default function AdminOnly({ children }) {
  const { user } = useContext(UserContext);

  if (user.isAdmin) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
}
