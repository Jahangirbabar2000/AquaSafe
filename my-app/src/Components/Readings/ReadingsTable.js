import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import "./Readings.css";
import { Grid, TablePagination } from "@mui/material";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 15
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0
  }
}));

function ReadingsTable() {

  const [ReadingsData, setReadingsData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    // FIRST API REQUEST - Data
    axios.get(`/hkdata`)
      .then(response => {
        setReadingsData(response.data);
      })
      .catch(error => console.log(error));
  }, []);

  const columns = [
    { id: 'Location', label: 'Location', align: 'center' },
    { id: 'Station', label: 'Station', align: 'center' },
    { id: 'Date', label: 'Date', align: 'center' },
    { id: 'Temperature', label: 'Temperature (C)', align: 'center' },
    { id: 'pH', label: 'pH', align: 'center' },
    { id: 'DissolvedOxygen', label: 'Dissolved Oxygen (mg/L)', align: 'center' },
    { id: 'Conductivity', label: 'Conductivity (µS/cm)', align: 'center' },
    { id: 'NitriteNitrogen', label: 'Nitrite-Nitrogen (mg/L)', align: 'center' },
    { id: 'BOD5', label: 'BOD5 (mg/L)', align: 'center' },
    { id: 'TotalPhosphorus', label: 'Total Phosphorus (mg/L)', align: 'center' },
    { id: 'AmmoniaNitrogen', label: 'Ammonia Nitrogen (mg/L)', align: 'center' },
  ];


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div style={{ marginLeft: 10 }}>
      <Grid spacing={40} container>
        <Grid item md={11}>
          <br />
          <br />
          <div style={{ display: "flex", alignItems: "center" }}>
            <h1 style={{ flex: 1 }}>Existing Readings</h1>
          </div>
          <br />
          <br />

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">

              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <StyledTableCell key={column.id} align="center">
                      {column.label}
                    </StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {ReadingsData.map(row => (
                  <StyledTableRow key={row.Id}>
                    <StyledTableCell component="th" scope="row">{row.Location}</StyledTableCell>
                    <StyledTableCell align="center">{row.Station}</StyledTableCell>
                    <StyledTableCell className="smallColumn" align="center">{row.Dates}</StyledTableCell>
                    <StyledTableCell className="smallColumn" align="center">{row["Water Temperature (°C)"]}</StyledTableCell>
                    <StyledTableCell className="smallColumn" align="center">{row["pH"]}</StyledTableCell>
                    <StyledTableCell className="smallColumn" align="center">{row["Dissolved Oxygen (mg/L)"]}</StyledTableCell>
                    <StyledTableCell className="smallColumn" align="center">{row["Conductivity (µS/cm)"]}</StyledTableCell>
                    <StyledTableCell className="smallColumn" align="center">{row["Nitrite-Nitrogen (mg/L)"]}</StyledTableCell>
                    <StyledTableCell className="smallColumn" align="center">{row["5-Day Biochemical Oxygen Demand (mg/L)"]}</StyledTableCell>
                    <StyledTableCell className="smallColumn" align="center">{row["Total Phosphorus (mg/L)"]}</StyledTableCell>
                    <StyledTableCell className="smallColumn" align="center">{row["Ammonia-Nitrogen (mg/L)"]}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={ReadingsData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Table>
          </TableContainer>

        </Grid>
      </Grid>
    </div>
  );
}

export default ReadingsTable;
