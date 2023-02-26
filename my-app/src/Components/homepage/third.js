import React from "react";
import "./homepage.css";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import visual from "./visualization2.png";
import { Link } from "react-router-dom";

export default function Third() {
  return (
    <div className="andmore">
      <div id="third-title">
        <h1 id="title">Just visiting?</h1>
        <p id="title-sub3">
          Visitors can access public data of their local water bodies.
        </p>
        <Link to="/dashboard">
          <Button className="look" variant="primary">Take a Look</Button>{" "}
        </Link>

      </div>

      <div className="pic-div">
        <img className="imgClass" src={visual} alt="logo" />
      </div>
    </div>
  );
}
