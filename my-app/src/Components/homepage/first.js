import React from 'react';
import "./homepage.css";
import water from "./Asset-5.svg";

export default function First(){
    return(
    <div className="title">
        <div className="title-child">
                <h1 id="title">An AI enabled quasi-real-time water quality monitoring for early contamination detection</h1>
            {/* <p id="title-sub">A cost and time efficient solution to monitoring water contamination.</p> */}
            <div>
                <p id="title-sub"> Sponsored by <span className="orange">Asi@</span><span className="blue">Connect</span>.</p>
                <p id="title-sub2">Powered by NUST x MachVis Lab.</p>
            </div>
            {/* <p id="regards" style={{margin: 2}}> Powered by NUST  x MachVis Lab</p> */}
        </div>
        <div className="title-child">
        <img className="top-img" src={water} alt="logo" />
        </div>
    </div>
    );
}



