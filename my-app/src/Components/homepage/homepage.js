import React from "react";
import "./homepage.css";
import First from "./first.js";
import Second from "./second";
import Third from "./third";
import logo from "./logo.jpg";
// import Sidebar from "../sidebar/side-bar";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <Navbarhome />
      <First />
      <Second />
      <Third />
      <div className=""></div>
    </div>
  );
}

export default Home;

function Navbarhome() {
  return (
    <nav className="nav-container">
      <img className="logo-img" src={logo} alt="logo" />
      {/* <a id="login" href="url">login</a> */}
      <Link to="/Login">
        <Button id="login" variant="primary">
          Login
        </Button>{" "}
      </Link>
      {/* <Button id="visitor" variant="primary">
        Take a peek
      </Button>{" "} */}
    </nav>
  );
}

function NavBarItem(props) {
  return (
    <a href="#" class="button">
      { }
    </a>
  );
}
