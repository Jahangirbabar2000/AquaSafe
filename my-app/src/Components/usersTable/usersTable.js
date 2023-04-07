import axios from "axios";
import React from 'react';
import { useEffect, useState } from "react";
import "./tableRow.css";
import Sidebar from "../sidebar/side-bar";
import Sidebar2 from "../sidebar/Sidebar2.js";
import { Grid } from "@mui/material";
import Navbar from "../navbar/navbar.js";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 15,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));



function UsersTable() {
  const [usersData, setUsersData] = useState([]);

  const getUsersData = async (req, res) => {
    res = await axios.get("/activeUsers");
    console.log(res.data);
    setUsersData(res.data);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/users/${id}`);
      setUsersData(usersData.filter((user) => user.Id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getUsersData();
  }, []);
  return (
    <div>
      <Navbar />
      <Grid spacing={40} container>
        <Grid item xs={4} sm={5} md={2}>
          <Sidebar2 name="Users" />
        </Grid>
        <Grid item xs={8} sm={7} md={9}>
          <br />
          <br />
          <h1>Active Users</h1>
          <br />
          <br />
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell align="right">Email</StyledTableCell>
                  <StyledTableCell align="right">Designation</StyledTableCell>
                  <StyledTableCell align="right">Country</StyledTableCell>
                  <StyledTableCell align="right">Site</StyledTableCell>
                  <StyledTableCell align="right">Edit</StyledTableCell>
                  <StyledTableCell align="right">Delete</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {usersData.map(row => (
                  <StyledTableRow key={row.Id}>
                    <StyledTableCell component="th" scope="row">
                      {row.FirstName}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.Email}</StyledTableCell>
                    <StyledTableCell align="right">
                      {row.Designation}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.Country}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.Site}</StyledTableCell>
                    <StyledTableCell className="smallColumn" align="right">
                      <Link to={`/edit/${row.Id}`}>
                        <EditIcon />
                      </Link>
                    </StyledTableCell>
                    <StyledTableCell className="smallColumn" align="right">
                      <IconButton onClick={() => handleDelete(row.Id)}>
                        <DeleteIcon />
                      </IconButton>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid container pt={5} pl={150}>
          <Link to="/signup"></Link>
        </Grid>
      </Grid>
    </div>
  );
}

export default UsersTable;