import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import React from 'react';

import "./NotificationTable.css";

const SensorNotification = props => {
  const data = props.data;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    // { field: "id", headerName: "ID", cellClassName: "name-column--cell" },
    {
      field: "project",
      headerName: "Project",
      flex: 2,
      cellClassName: "name-column--cell"
    },
    {
      field: "country",
      headerName: "Country",
      cellClassName: "name-column--cell"
      // type: "number",
      // flex: 1
      // headerAlign: "left",
      // align: "left",
    },
    {
      field: "city",
      headerName: "City",
      cellClassName: "name-column--cell",
      // type: "number",
      flex: 1
      // headerAlign: "left",
      // align: "left",
    },
    {
      field: "device",
      headerName: "Device",
      cellClassName: "name-column--cell"
      // flex: 1
    },
    {
      field: "sensor",
      headerName: "Sensor",
      cellClassName: "name-column--cell"
      // flex: 1
    },
    {
      field: "min",
      headerName: "Minimum",
      // flex: 1,
      type: "number",
      headerAlign: "left",
      align: "left",
      cellClassName: "name-column--cell"
    },
    {
      field: "max",
      headerName: "Maximum",
      type: "number",
      headerAlign: "left",
      align: "left",
      cellClassName: "name-column--cell"
      // flex: 1
    },
    {
      field: "reading",
      headerName: "Reading",
      type: "number",
      headerAlign: "left",
      align: "left",
      cellClassName: "name-column--cell"
      // flex: 1
    },
    {
      field: "status",
      headerName: "Status",
      cellClassName: "name-column--cell"
      // type: "number",
      // headerAlign: "left",
      // align: "left"
      // flex: 1
    },
    {
      field: "details",
      headerName: "Details",
      // type: "number",
      // headerAlign: "left",
      // align: "left"
      flex: 5,
      cellClassName: "name-column--cell"
    },
    {
      field: "date",
      headerName: "Date",
      cellClassName: "name-column--cell"

      // flex: 1
    }
  ];

  return (
    <div><h1 style={{ marginLeft: "4%" }}>Sensor Notifications</h1>
      <Box m="10px">
        <Box
          className="sensor-notfication-box"
          m="25px 0 0 3%"
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
          <DataGrid checkboxSelection rows={data} columns={columns} />
        </Box>
      </Box>
    </div>
  );
};

export default SensorNotification;
