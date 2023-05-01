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





//Creating


// retrieve the data from the database here. Then pass it to the ReadingsTable component
// as
// <ReadingsTable data={JsonObjectName}>




export default function Readings() {
  const [jsonData, setJsonData] = useState([]);
  const [isCSV, setCSV] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState(null);

  const handleFileChange = e => {
    const file = e.target.files[0];
    setSelectedFileName(file.name);
    Papa.parse(file, {
      header: true,
      complete: results => {
        const rows = results.data;
        const headers = results.meta.fields;
        const json = rows.slice(0, -1).map((row, index) =>
          headers.reduce((acc, header) => {
            acc[header] = row[header];
            return acc;
          }, { id: index }) // Add a unique id property to each row
        );
        setJsonData(json);
        setCSV(true);
      }
    });
  };

  // This function downloads the template. It is in the public folder
  // function downLoadCSV() {
  //   window.location.href = "/template.csv";
  // }

  return (
    <div>
      {/* <CsvTokenizer /> */}
      <Navbar />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "28vh auto"
        }}
      >
        <div>
          <Sidebar2 name="Readings" />
        </div>
        <div style={{ marginLeft: 150, marginTop: 20 }}>    
          <CsvDownloadButton />

          <Button
            variant="contained"
            component="label"
            style={{ marginLeft: "1%", padding: "0.5%", marginTop: "10px" }}
          >
            {selectedFileName ? selectedFileName : "Upload"}
            <input
              hidden
              accept=".csv"
              type="file"
              onChange={handleFileChange}
            />
          </Button>

          {!isCSV && <ReadingsTable />}
          {isCSV && <CSVTable data={jsonData} />}
        </div>
      </div>
    </div>
  );
}

function CSVTable(props){
  const data = props.data;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    {
      field: "Location",
      headerName: "Location",
      // flex: 2,
      cellClassName: "name-column--cell"
    },
    {
      field: "Station",
      headerName: "Station",
      cellClassName: "name-column--cell",
      // type: "number",
      flex: 1,
      // headerAlign: "left",
      // align: "left",
    },
    {
      field: "Date",
      headerName: "Date",
      cellClassName: "name-column--cell",
      // type: "number",
      flex: 1
      // headerAlign: "left",
      // align: "left",
    },
    {
      field: "Temperature",
      headerName: "Temperature (C)",
      cellClassName: "name-column--cell",
      flex: 1
    },
    {
      field: "pH",
      headerName: "pH",
      cellClassName: "name-column--cell"
      // flex: 1
    },
    {
      field: "DissolvedOxygen",
      headerName: "Dissolved Oxygen (mg/L)",
      flex: 2,
      type: "number",
      headerAlign: "left",
      align: "left",
      cellClassName: "name-column--cell"
    },
    {
      field: "Conductivity",
      headerName: "Conductivity (µS/cm)",
      type: "number",
      headerAlign: "left",
      align: "left",
      cellClassName: "name-column--cell",
      flex: 2
    },
    {
      field: "NitriteNitrogen",
      headerName: "Nitrite-Nitrogen (mg/L)",
      type: "number",
      headerAlign: "left",
      align: "left",
      cellClassName: "name-column--cell",
      flex: 2
    },
    {
      field: "BOD5",
      headerName: "BOD5 (mg/L)",
      cellClassName: "name-column--cell",
      flex: 1
    },
    {
      field: "TotalPhosphorus",
      headerName: "Total Phosphorus (mg/L)",
      flex: 2,
      cellClassName: "name-column--cell"
    },
    {
      field: "AmmoniaNitrogen",
      headerName: "Ammonia Nitrogen (mg/L)",
      cellClassName: "name-column--cell",
      flex: 2,
    }
  ];

  return (
    <div><h1 style={{ marginLeft: "1%", paddingTop: "1%" }}>CSV Readings</h1>
      <Box m="0x">
        <Box
          className="sensor-notfication-box"
          m="15px 0 0 1%"
          height="75vh"
          sx={{
            width: "95%",
            "& .MuiDataGrid-root": {
              // border: "none",
            },
            "& .MuiDataGrid-cell": {
              // borderBottom: "none",
            },
            "& .name-column--cell": {
              // color: colors.greenAccent[300],
              fontSize: 12
            },
            "& .MuiDataGrid-columnHeaders": {
              //   backgroundColor: colors.blueAccent[700],
              backgroundColor: "black",
              borderBottom: "none",
              fontSize: 15,
              color: "white"
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[400]
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: "black"
            },
            "& .MuiCheckbox-root": {
              color: `${colors.greenAccent[200]} !important`
            },
            "& .MuiTablePagination-root": {
              fontSize: 15,
              color: "white"
            },
            "& .MuiSvgIcon-root": {
              color: "white"
            }
          }}
        >
          <DataGrid checkboxSelection rows={data} columns={columns} headerWordWrap={true} headerAlign="center" />
        </Box>
      </Box>
    </div>
  );

}
