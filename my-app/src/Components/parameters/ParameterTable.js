import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import "./ParameterTable.css";
import { Paper, Button, IconButton, Tooltip, Snackbar } from "@mui/material"
import Sidebar2 from "../sidebar/Sidebar2.js";
import { Grid } from "@mui/material";
import Navbar from "../navbar/navbar.js";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Alert from '@mui/material/Alert';


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

function ParameterTable() {
  const [parametersData, setParametersData] = useState([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const getParametersData = async (req, res) => {
    res = await axios.get("http://localhost:8080/parameters");
    console.log(res.data);
    setParametersData(res.data);
  };

  const handleDelete = async name => {
    try {
      await axios.delete(`http://localhost:8080/parameters/${name}`);
      setParametersData(parametersData.filter((parameter) => parameter.Name !== name));
      setOpen(true);
      setMessage("Parameter deleted successfully");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getParametersData();
  }, []);

  return (
    <div>
      <Navbar />
      <Grid spacing={40} container>
        <Grid item xs={4} sm={5} md={2}>
          <Sidebar2 name="Parameters" />
        </Grid>
        <Grid item xs={8} sm={7} md={9}>
          <br />
          <br />
          <div style={{ display: "flex", alignItems: "center" }}>
            <h1 style={{ flex: 1 }}>Existing Parameters</h1>
            {/* EDIT LINE BELOW */}
            <Link to="/addParameter" style={{ textDecoration: 'none' }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
              >
                Add Parameter
              </Button>
            </Link>
          </div>
          <br />
          <br />

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">Name</StyledTableCell>
                  <StyledTableCell align="center">Unit</StyledTableCell>
                  <StyledTableCell align="center">Min</StyledTableCell>
                  <StyledTableCell align="center">Max</StyledTableCell>
                  <StyledTableCell align="center">Edit</StyledTableCell>
                  <StyledTableCell align="center">Delete</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {parametersData.map(row => (
                  <StyledTableRow key={row.Id}>
                    <StyledTableCell component="th" scope="row">
                      {row.Name}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.Unit}
                    </StyledTableCell>
                    <StyledTableCell className="mediumColumn" align="center">
                      {row.Min}
                    </StyledTableCell>
                    <StyledTableCell className="mediumColumn" align="center">
                      {row.Max}
                    </StyledTableCell>
                    <StyledTableCell className="smallColumn" align="center">
                      <Tooltip title="Edit">
                        <Link to={`/edit/${row.Name}`}>
                          <EditIcon />
                        </Link>
                      </Tooltip>
                    </StyledTableCell>
                    <StyledTableCell className="smallColumn" align="center">
                      <Tooltip title="Delete">
                        <IconButton onClick={() => handleDelete(row.Name)}>
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            open={open}
            autoHideDuration={3000}
            onClose={() => setOpen(false)}
          >
            <Alert onClose={() => setOpen(false)} severity="success" variant="filled">
              {message}
            </Alert>
          </Snackbar>

        </Grid>
      </Grid>
    </div>
  );
}

export default ParameterTable;
