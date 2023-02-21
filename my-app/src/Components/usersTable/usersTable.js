import axios from "axios";
import { useEffect, useState } from "react";
import "./tableRow.css";
import Sidebar from "../sidebar/side-bar";
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
// import NewButton from "../button/button";
import { Link } from 'react-router-dom';
import Button from "@mui/material/Button";

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
    res = await axios.get("http://localhost:8080/activeUsers");
    console.log(res.data);
    setUsersData(res.data);
  };

  useEffect(() => {
    getUsersData();
  }, []);
  return (
    <div>
      <Navbar />
      <Grid container>
        <Grid item xs={4} sm={5} md={2}>
          <Sidebar name="users"/>
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
                </TableRow>
              </TableHead>
              <TableBody>
                {usersData.map((row) => (
                  <StyledTableRow key={row.Id}>
                    <StyledTableCell component="th" scope="row">
                      {row.FirstName}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.Email}</StyledTableCell>
                    <StyledTableCell align="right">{row.Designation}</StyledTableCell>
                    <StyledTableCell align="right">{row.Country}</StyledTableCell>
                    <StyledTableCell align="right">{row.Site}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid container pt={5} pl={150}>
          <Link to="/signup">
            {/* <NewButton text={"Add new user"}>
            </NewButton> */}
            <Button fullWidth variant="contained">Add New User</Button>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
}

export default UsersTable;