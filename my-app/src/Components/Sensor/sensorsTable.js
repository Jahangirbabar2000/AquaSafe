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
import Button from "@mui/material/Button";
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

function SensorsTable() {
    const [sensorsData, setSensorsData] = useState([]);

    const getUsersData = async (req, res) => {
        res = await axios.get("/sensorsTable");
        console.log(res.data);
        setSensorsData(res.data);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/sensors/${id}`);
            setSensorsData(sensorsData.filter((user) => user.Id !== id));
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
                        <Link to="/addSensor">
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                size="large"
                            >
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
                                            <Link to={`/edit/${row.Id}`}>
                                                <EditIcon />
                                            </Link>
                                        </StyledTableCell>
                                        <StyledTableCell className="smallColumn" align="center">
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
                    <Link to="/signup">
                    </Link>
                </Grid>
            </Grid>
        </div>
    );
}

export default SensorsTable;