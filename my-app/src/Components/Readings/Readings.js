import React, { useState } from "react";
import Sidebar2 from "../sidebar/Sidebar2.js";
import Navbar from "../navbar/navbar.js";
import Button from "@mui/material/Button";
import ReadingsTable from "./ReadingsTable.js";
import CsvTokenizer from "./importCSV.js";
import Papa from "papaparse";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";

import "./Readings.css";
import CsvDownloadButton from "./TemplateDownload.js";

export default function Readings() {
  const [jsonData, setJsonData] = useState([]);
  const [isCSV, setCSV] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFileName(file.name);
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        const rows = results.data;
        const headers = results.meta.fields;
        const json = rows
          .slice(0, -1)
          .map((row, index) =>
            headers.reduce((acc, header) => {
              acc[header] = row[header];
              return acc;
            }, { id: index }) // Add a unique id property to each row
          );
        setJsonData(json);
        setCSV(true);
      },
    });
  };

  return (
    <div>
      {/* <CsvTokenizer /> */}
      <Navbar />
      <div style={{ display: "grid", gridTemplateColumns: "28vh auto" }}>
        <div>
          <Sidebar2 name="Readings" />
        </div>
        <div style={{ marginLeft: 150, marginTop: 20 }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <CsvDownloadButton />

            <Button
              variant="contained"
              component="label"
              style={{
                marginLeft: "1%",
                padding: "0.5%",
                marginTop: "10px",
              }}
            >
              {selectedFileName ? selectedFileName : "Upload"}
              <input
                hidden
                accept=".csv"
                type="file"
                onChange={handleFileChange}
              />
            </Button>
          </div>

          {!isCSV && <ReadingsTable />}
        </div>
      </div>
    </div>
  );
}
