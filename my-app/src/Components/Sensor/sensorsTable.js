import axios from "axios";
import React, { useEffect, useState } from "react";
import { Grid, styled } from "@mui/material";
import { Link } from "react-router-dom";
import { Paper, Button, IconButton, Tooltip, Snackbar } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, tableCellClasses, } from "@mui/material";
import "./tableRow.css";
import Sidebar2 from "../sidebar/Sidebar2.js";
import Navbar from "../navbar/navbar.js";


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

function SensorsTable() {

    const [sensorsData, setSensorsData] = useState([]);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");


    const getUsersData = async (req, res) => {
        res = await axios.get("http://localhost:8080/sensorsTable");
        console.log(res.data);
        setSensorsData(res.data);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/sensors/${id}`);
            setSensorsData(sensorsData.filter((user) => user.Id !== id));
            setOpen(true);
            setMessage("Sensor deleted successfully");
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
                    <Sidebar2 name="Sensors" />
                </Grid>
                <Grid item xs={8} sm={7} md={9}>
                    <br />
                    <br />
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <h1 style={{ flex: 1 }}>Existing Sensors</h1>
                        <Link to="/addSensor" style={{ textDecoration: 'none' }}>
                            <Button type="submit" variant="contained" color="primary" size="large">
                                Add Sensor
                            </Button>
                        </Link>
                    </div>
                    <br />
                    <br />

                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Parameter</StyledTableCell>
                                    <StyledTableCell align="center">Model</StyledTableCell>
                                    <StyledTableCell align="center">SensorMin</StyledTableCell>
                                    <StyledTableCell align="center">SensorMax</StyledTableCell>
                                    <StyledTableCell align="center">Edit</StyledTableCell>
                                    <StyledTableCell align="center">Delete</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {sensorsData.map((row) => (
                                    <StyledTableRow key={row.Id}>
                                        <StyledTableCell component="th" scope="row">
                                            {row.Parameter}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">{row.Model}</StyledTableCell>
                                        <StyledTableCell className="mediumColumn" align="center">{row.SensorMin}</StyledTableCell>
                                        <StyledTableCell className="mediumColumn" align="center">{row.SensorMax}</StyledTableCell>
                                        <StyledTableCell className="smallColumn" align="center">
                                            <Tooltip title="Edit">
                                                <Link to={`/edit/${row.Id}`}>
                                                    <EditIcon />
                                                </Link>
                                            </Tooltip>
                                        </StyledTableCell>
                                        <StyledTableCell className="smallColumn" align="center">
                                            <Tooltip title="Delete">
                                                <IconButton onClick={() => handleDelete(row.Id)}>
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
                        message={message}
                    />

                </Grid>
                <Grid container pt={5} pl={150}>
                    <Link to="/signup">
                    </Link>
                </Grid>
            </Grid>
        </div>
    );
}

export default SensorsTable;