import React from "react";
import "./homepage.css";
import water from "./Asset-5.svg";

export default function First() {
  return (
    <div className="title">
      <div className="title-child">
        <div ><h1 id="app-name">AquaSafe</h1></div>
        <h1 id="title">
          An AI enabled quasi-real-time water quality monitoring for early
          contamination detection.
        </h1>
        <div>
          <p id="title-sub">
            Sponsored by <span className="orange">Asi@</span>
            <span className="blue">Connect</span>.
          </p>
          <p id="title-sub2">Powered by NUST x MachVis Lab.</p>
        </div>
      </div>
      <div className="title-child">
        <img className="top-img" src={water} alt="logo" />
      </div>
    </div>
  );
}
