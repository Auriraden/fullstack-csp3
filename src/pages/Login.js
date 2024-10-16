import { useState, useEffect, useContext } from 'react';
import { Form, Button } from "react-bootstrap";
import { Navigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import UserContext from '../UserContext';

export default function Login() {

    // This prop is imported from App.js (UserProvider)
    const { user, setUser }  = useContext(UserContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isActive, setIsActive] = useState(false);

    function authenticate(e){
        e.preventDefault();

        fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify ({email, password})
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(typeof data.access !== "undefined"){
                localStorage.setItem('token', data.access);
                retrieveUserDetails(data.access);
                Swal.fire({
					title: "Login Successful",
					icon: "success",
					text: "Welcome!"
				})

			} else {
				// alert(`${email} does not exist`);
				Swal.fire({
					title: "Authentication failed",
					icon: "error",
					text: "Check your login details and try again."
				})
            }
        })
    }

    function retrieveUserDetails(token) {
      fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setUser({
            id: data._id,
            isAdmin: data.isAdmin,
          });
        });
    }

    useEffect(() => {

		if(email !== "" && password !== ""){
			setIsActive(true)
		} else {
			setIsActive(false)
		}

	}, [email, password]);

    return user.id !== null ? (
      <Navigate to="/" />
    ) : (
      <Form onSubmit={(e) => authenticate(e)} className="container">
        <h1 className="my-5 text-center">Login</h1>
        <Form.Group controlId="userEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <p>
          No account yet? <Link to="/register">Register</Link>
        </p>
        {isActive ? (
          <Button variant="success" type="submit" id="submitBtn">
            Submit
          </Button>
        ) : (
          <Button variant="warning" type="submit" id="submitBtn" disable>
            Submit
          </Button>
        )}
      </Form>
    );

}