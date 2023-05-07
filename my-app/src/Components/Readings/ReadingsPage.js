import React from "react";
import Sidebar2 from "../sidebar/Sidebar2.js";
import Navbar from "../navbar/navbar.js";
import ReadingsTable from "./ReadingsTable.js";
import "./Readings.css";
import CsvDownloadButton from "./CsvDownloadButton.js";
import CsvUploadButton from "./CsvUploadButton .js";

export default function ReadingsPage() {


  return (
    <div>
      <Navbar />
      <div style={{ display: "grid", gridTemplateColumns: "28vh auto" }}>
        <div>
          <Sidebar2 name="Readings" />
        </div>
        <div style={{ marginLeft: 150, marginTop: 10 }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <CsvDownloadButton />
            <CsvUploadButton />
          </div>
          {<ReadingsTable />}
        </div>
      </div>
    </div>
  );
}
