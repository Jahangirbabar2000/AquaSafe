import React, { useState } from "react";
import Sidebar2 from "../sidebar/Sidebar2.js";
import Navbar from "../navbar/navbar.js";
import Button from "@mui/material/Button";
import ReadingsTable from "./ReadingsTable.js";

import "./Readings.css";

// retrieve the data from the database here. Then pass it to the ReadingsTable component
// as
// <ReadingsTable data={JsonObjectName}>

export default function Readings() {


    const handleClick = () => {
        console.log("download button");
    };

    const handleClick2 = () => {
        console.log("upload button");
    };

    return (
      <div>
        <Navbar />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "28vh auto"
            // gridGap: "2px"
          }}
        >
          <div>
            <Sidebar2 name="Readings" />
          </div>
          <div>
            <Button
              variant="contained"
              // borderWidth={100}
              style={{ marginLeft: "1%", padding: "0.5%", marginTop: "10px" }}
              onClick={handleClick2}
              // color={`${showDevice === false ? "success" : "primary"}`}
            >
              Download Template
            </Button>
            <Button
              style={{ marginLeft: "1%", padding: "0.5%", marginTop: "10px" }}
              variant="contained"
              // borderWidth={3}
              onClick={handleClick}
              // color={`${showDevice === true ? "success" : "primary"}`}
              // sx={{border:"green"}}
            >
              Upload Data
            </Button>

            <ReadingsTable />
          </div>
        </div>
      </div>
    );
}