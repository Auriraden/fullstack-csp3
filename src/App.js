/* -------------------------------------------------------------------------- */
/*                           Importing Dependencies                           */
/* -------------------------------------------------------------------------- */
import { useState, useEffect } from 'react';
import { UserProvider } from './UserContext';

/* ---------------------------- Import Bootstrap ---------------------------- */
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from 'react-bootstrap';

/* ------------------------- Import React Router DOM ------------------------ */
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';

/* ----------------------------- Import App.CSS ----------------------------- */
import './App.css';

/* -------------------------------------------------------------------------- */
/*                              Import Pages Here                             */
/* -------------------------------------------------------------------------- */
import Login from './pages/Login'
import Logout from './pages/Logout'
import Register from './pages/Register'
import ProductsPage from './pages/ProductsPage'
import UsersPage from './pages/UsersPage';
import Home from './pages/Home';
import Profile from './pages/Profile';
import OrdersPage from './pages/OrdersPage';
import Error from './pages/Error';

/* -------------------------------------------------------------------------- */
/*                           Import Components Here                           */
/* -------------------------------------------------------------------------- */
import AppNavbar from './components/AppNavbar';
import AdminOnly from './components/AdminOnly';

function App() {

  // storing the user information upon login for all components/pages
  const [user, setUser] = useState({
    id: null,
    isAdmin: null
  });

  const unSetUser = () => {
    localStorage.clear();
  }

  useEffect (() =>{
    fetch(`${process.env.REACT_APP_API_URL}/b1/users/details`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(res => res.json())
    .then(data => {
      // Setting the user to store id and isAdmin properties
      if(typeof data._id !== "undefined"){
        setUser({
          id: data._id,
          isAdmin: data.isAdmin
        })
      } else{
        setUser({
          id:null,
          isAdmin: null
        })
      }
    })
  }, [])

  return (
    <UserProvider value={{ user, setUser, unSetUser }}>
      <Router>
        <Container fluid>
          <AppNavbar />
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/register" element={<Register />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/users" element={<AdminOnly><UsersPage /></AdminOnly>} />
              <Route path="/orders" element={<AdminOnly><OrdersPage /></AdminOnly>} />

              <Route path="*" element={<Error />} />
          </Routes>
        </Container>
      </Router>
    </UserProvider>
  );
}

export default App;
