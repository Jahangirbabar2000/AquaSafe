import React, { useState } from 'react';
import './login.css';
import axios from 'axios';
import Navbar from "../navbar/navbar.js";
import { Link } from "react-router-dom";


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailValidation = (email) => {
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!emailRegex.test(email)) {
            // alert("Please enter a valid email address.");
        }
    };

    const handlePasswordValidation = (password) => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z!@#$%^&*]{8,}$/;
        if (!passwordRegex.test(password)) {
            // alert("Please enter a valid password. It should be more than 7 characters long and include at least one uppercase character and one special character.");
        }
    };

    const config = {
        "headers": {
            "Content-Type": "application/json"
        }
    }
    const postData = async (data) => { await axios.post('http://localhost:8080', data, config); }

    const handleSubmit = (event) => {
        event.preventDefault();
        // validate form and submit data

        const formData = JSON.stringify({
            email,
            password
        });
        // send formData as a JSON to the backend  
        postData(formData);
    };

    return (
        <div>
            <Navbar />
            <br />
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                <br />
                <br />
                <br />
                <label htmlFor="email">Email:</label><br />
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    onBlur={(event) => handleEmailValidation(event.target.value)}
                />
                <br />
                <br />
                <label htmlFor="password">Password:</label><br />
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    onBlur={(event) => handlePasswordValidation(event.target.value)}
                />
                <br />
                <br />
                <br />                
                <Link to="/sites">
                    <button type="submit">Login</button>
                </Link>
            </form>
        </div>
    );
}

export default Login;