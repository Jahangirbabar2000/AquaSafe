import React, { useState } from 'react';
import './signUp.css';
import axios from 'axios';

function SignUp() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [designation, setDesignation] = useState('');
    const [country, setCountry] = useState('');
    const [site, setSite] = useState('');

    const handleEmailValidation = (email) => {
        const emailRegex = /@/;
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

    const handleConfirmPasswordValidation = (password, confirmPassword) => {
        if (password !== confirmPassword) {
            //   alert("Passwords do not match. Please try again.");
        }
    };

    const config = {
        "headers":{
          "Content-Type":"application/json"
        }}
    const postData = async (data) => { await axios.post('http://localhost:5000', data,config); }

    const handleSubmit = (event) => {
        event.preventDefault();
        // validate form and submit data
        
        const formData = JSON.stringify({
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            designation,
            country,
            site
        });
        // send formData as a JSON to the backend  
        postData(formData);
    };

    return (<div>
        <h3>Sign Up</h3>
        <form onSubmit={handleSubmit}>
            <label htmlFor="first-name">First Name:</label><br />
            <input
                type="text"
                id="first-name"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
            />
            <br />
            <label htmlFor="last-name">Last Name:</label><br />
            <input
                type="text"
                id="last-name"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
            />
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
            <label htmlFor="password">Password:</label><br />
            <input
                type="password"
                id="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                onBlur={(event) => handlePasswordValidation(event.target.value)}
            />
            <br />
            <label htmlFor="confirm-password">Confirm Password:</label><br />
            <input
                type="password"
                id="confirm-password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                onBlur={(event) => handleConfirmPasswordValidation(password, event.target.value)}
            />
            <br />
            <label htmlFor="designation">Select your designation:</label><br />
            <select
                id="designation"
                value={designation}
                onChange={(event) => setDesignation(event.target.value)}
            >
                <option value="IoT Engineer">IoT Engineer</option>
                <option value="Local Admin">Local Admin</option>
                <option value="Government Admin">Government Admin</option>
            </select>
            <br />
            <label htmlFor="country">Select country:</label><br />
            <select
                id="country"
                value={country}
                onChange={(event) => setCountry(event.target.value)}
            >
                <option value="China">China</option>
                <option value="India">India</option>
                <option value="Indonesia">Indonesia</option>
                <option value="Japan">Japan</option>
                <option value="South Korea">South Korea</option>
                <option value="Malaysia">Malaysia</option>
                <option value="Pakistan">Pakistan</option>
                <option value="Philippines">Philippines</option>
                <option value="Singapore">Singapore</option>
                <option value="Thailand">Thailand</option>
            </select><br />  <label htmlFor="site">Select site:</label><br />
            <select
                id="site"
                value={site}
                onChange={(event) => setSite(event.target.value)}
            >
                <option value="Rawal Dam">Rawal Dam</option>
                <option value="Tarbela Dam">Tarbela Dam</option>
                <option value="Mangla Dam">Mangla Dam</option>
            </select><br /><br />
            <button type="submit">Sign Up</button>
        </form></div>
    );
}

export default SignUp;