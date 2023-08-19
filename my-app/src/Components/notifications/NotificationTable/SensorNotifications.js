import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import React from 'react';

const SensorNotification = props => {
  const data = props.data;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      cellClassName: "name-column--cell"
    },
    {
      field: "code",
      headerName: "Code",
      flex: 0.4,
      cellClassName: "name-column--cell"
    },
    {
      field: "location",
      headerName: "Location",
      flex: 1.8,
      cellClassName: "name-column--cell"
    },
    {
      field: "description",
      headerName: "Description",
      flex: 6,
      cellClassName: "name-column--cell"
    },
    {
      field: "status",
      headerName: "Status",
      flex: 0.7,
      cellClassName: "name-column--cell"
    }
  ];

  return (
    <div><h1 style={{ marginLeft: "4%" }}>Sensor Notifications</h1>
      <Box m="10px">
        <Box
          className="sensor-notfication-box"
          m="0 0 0 3%"
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
            },
            backgroundColor: '#ffffff'
          }}
        >
          <DataGrid checkboxSelection rows={data} columns={columns} />
        </Box>
      </Box>
    </div>
  );
};

export default SensorNotification;
