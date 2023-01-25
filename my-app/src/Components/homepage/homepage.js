import React from 'react';
import "./homepage.css";
import First from "./first.js";
import Second from "./second";
import Third from "./third";
import logo from "./logo.jpg";
import Footer from "./footer.js";
import Sidebar from "../sidebar/side-bar"
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
    return (
        <div>
            <Navbarhome />
            <First />
            <Second />

            <Third />
            <div className="about">
                <Footer />
            </div>
        </div>
    );
}

export default Home;

function Navbarhome() {
    return (
        // <div className="nav-container">
        <nav className="nav-container">
            <img className="logo-img" src={logo} alt="logo" />
            {/* <a id="login" href="url">login</a> */}
            <Button id="login" variant="primary">Login</Button>{' '}
            <Button id="visitor" variant="primary">Take a peek</Button>{' '}
        </nav>
        // </div>
    )
}

function NavBarItem(props) {
    return (
        <a href="#" class="button">{ }</a>
    );
}