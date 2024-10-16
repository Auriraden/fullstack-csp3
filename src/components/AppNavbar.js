import { useState, useContext } from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import UserContext from '../UserContext';


export default function AppNavbar(){

    const { user } = useContext(UserContext);
    
    return (
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">READY TO BE: Twice in Bulacan 2023</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={NavLink} to="/">Home</Nav.Link>
              {(user.id !== null) ? 
                    (user.isAdmin) ?
                        <>
                        <Nav.Link as={NavLink} to="/products" exact>Manage Products</Nav.Link>
                        <Nav.Link as={NavLink} to="/orders" exact>Manage Orders</Nav.Link>
                        <Nav.Link as={NavLink} to="/users" exact>Manage Users</Nav.Link>
                        <Nav.Link as={NavLink} to="/logout" exact>Logout</Nav.Link>
                        </>
                        :
                        <>
                        <Nav.Link as={NavLink} to="/profile" exact>Cart/Profile</Nav.Link>
                        <Nav.Link as={NavLink} to="/products" exact>Products</Nav.Link>
                        <Nav.Link as={NavLink} to="/logout" exact>Logout</Nav.Link>
                        </>
                    :
                    <>
                    <Nav.Link as={NavLink} to="/products" exact>Products</Nav.Link>
                    <Nav.Link as={NavLink} to="/login" exact>Login</Nav.Link>
                    <Nav.Link as={NavLink} to="/register" exact>Register</Nav.Link>
                    </>
                    }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
}
