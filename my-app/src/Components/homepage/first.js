import React from "react";
import "./homepage.css";
import water from "./Asset-5.svg";

import nustlogo from "../../nust.png";
import asiaconnectLogo from "../../asiaconenct-logo.png";

export default function First() {
  return (
    <div className="title" style={{marginTop: 100}}>
      <div className="title-child">
        <div style={{display: "flex"}} ><h1 id="app-name">AquaSafe</h1>
        {/* <img style={{height: 50 ,marginLeft: 20, marginTop:28}} src={asiaconnectLogo} alt="asiaconnect logo" />
          <img style={{height: 55 ,marginLeft: 10, marginTop: 28}}src={nustlogo} alt="NUST logo" /> */}
        
        </div>
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
