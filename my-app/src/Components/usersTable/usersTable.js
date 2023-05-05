import axios from "axios";
import React from 'react';
import { useEffect, useState } from "react";
import "./tableRow.css";
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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


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
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);


  const getUsersData = async (req, res) => {
    res = await axios.get("http://localhost:8080/activeUsers");
    setUsersData(res.data);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/users/${id}`);
      setUsersData(usersData.filter((user) => user.Id !== id));
      closeDeleteDialog();
      setSnackbarOpen(true); // Show Snackbar on successful deletion
    } catch (err) {
      console.error(err);
    }
  };



  const openDeleteDialog = (id) => {
    setOpenDialog(true);
    setSelectedId(id);
  };

  const closeDeleteDialog = () => {
    setOpenDialog(false);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
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

          <div style={{ display: "flex", alignItems: "center" }}>
            <h1 style={{ flex: 1 }}>Active Users</h1>
            {/* EDIT LINE BELOW */}
            <Link to="/signup" style={{ textDecoration: 'none' }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
              >
                Register New User
              </Button>
            </Link>
          </div>
          <br />
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>First Name</StyledTableCell>
                  <StyledTableCell>Last Name</StyledTableCell>
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
                    <StyledTableCell>{row.LastName}</StyledTableCell>
                    <StyledTableCell align="right">{row.Email}</StyledTableCell>
                    <StyledTableCell align="right">
                      {row.Designation}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.Country}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.Site}</StyledTableCell>
                    <StyledTableCell className="smallColumn" align="right">
                      <Link to={`/editUser/${row.Id}`}>
                        <EditIcon />
                      </Link>
                    </StyledTableCell>
                    <StyledTableCell className="smallColumn" align="right">
                      <IconButton onClick={() => openDeleteDialog(row.Id)}>
                        <DeleteIcon />
                      </IconButton>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      <Dialog
        open={openDialog}
        onClose={closeDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete User Confirmation"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action will remove this user from the system and unassign him/her from any assigned projects. Are you sure?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="error"
            startIcon={<CancelIcon />}
            onClick={closeDeleteDialog}
          >
            No
          </Button>
          <Button
            variant="outlined"
            color="success"
            startIcon={<CheckCircleIcon />}
            onClick={() => handleDelete(selectedId)}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} variant="filled" severity="success" sx={{ width: '100%' }}>
          User deletion successful
        </Alert>
      </Snackbar>

    </div>
  );
}

export default UsersTable;