import React from "react";
import "./devices.css";
import Sidebar from "../sidebar/side-bar.js";
import Navbar from "../navbar/navbar.js";
import Templates from "./devices-components/select-template.js";
import DeviceDeployment from "./devices-components/device-deployment.js";

function Device() {
  return (
    <div>
      <Navbar />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "32vh auto"
        }}
      >
        <div>
          <Sidebar name="" />
        </div>
        <div style={{ background: "#f2f2f2", padding: "16px" }}>
          <div>
            <h1 style={{ textAlign: "center", paddingBottom: "20px", paddingTop: "10px" }}>
              Device Deployment
            </h1>
          </div>
          {/* this div is for  */}
          <div>
            <DeviceDeployment />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Device;
