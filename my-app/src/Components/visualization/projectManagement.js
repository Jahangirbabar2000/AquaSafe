import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Paper,
    Button,
    IconButton,
    Tooltip,
    Snackbar,
} from "@mui/material";
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
import Alert from "@mui/material/Alert";
import { useParams, useNavigate } from "react-router-dom";

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
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));

function ProjectManagement() {
    const { projectId } = useParams();
    const [projects, setProjects] = useState(null);
    const [devices, setDevices] = useState([]);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");

    const getProjectDetails = async () => {
        try {
            const response = await axios.get(`/projects/${projectId}`);
            setProjects(response.data);
            const devicesResponse = await axios.get(`/api/deployeddevices/byproject/${response.data.Name}`);
            setDevices(devicesResponse.data);
        } catch (error) {
            console.error("Error fetching project details:", error);
        }
    };

    const handleDeleteDevice = async (deviceId) => {
        try {
            await axios.delete(`/api/deployeddevices/${deviceId}`);
            setDevices(devices.filter((device) => device.Id !== deviceId));
            setOpen(true);
            setMessage("Device deleted successfully");
        } catch (error) {
            console.error("Error deleting device:", error);
        }
    };

    const handleDeleteProject = async () => {
        try {
            await axios.delete(`/projects/${projectId}`);
            // Perform any additional actions after deleting the project
            setOpen(true);
            setMessage("Project deleted successfully");
        } catch (error) {
            console.error("Error deleting project:", error);
        }
    };

    useEffect(() => {
        getProjectDetails();
    }, []);

    return (
        <div>
            <Navbar />
            <Grid mb={5} spacing={40} container>
                <Grid item xs={4} sm={5} md={2}>
                    <Sidebar2 name="Dashboard" />
                </Grid>
                <Grid item xs={8} sm={7} md={9}>
                    <br />
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <h1 style={{ flex: 1 }}>Edit Project</h1>
                    </div>
                    <br />
                    {projects.map((project) => (
                        <div key={project.Id}>
                            <Paper elevation={3} style={{ marginBottom: "20px", padding: "10px" }}>
                                <h2>Project Details</h2>
                                <p>Name: {project.Name}</p>
                                <p>Location: {project.Location}</p>
                                <p>Country: {project.Country}</p>
                                <p>Longitude: {project.Longitude}</p>
                                <p>Latitude: {project.Latitude}</p>
                                <p>Description: {project.Description}</p>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    size="large"
                                    onClick={() => handleDeleteProject(project.Id)}
                                >
                                    Delete Project
                                </Button>
                            </Paper>
                            <h2>Devices</h2>
                            {devices.length > 0 ? (
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                        <TableHead>
                                            <TableRow>
                                                <StyledTableCell align="center">Name</StyledTableCell>
                                                <StyledTableCell align="center">Longitude</StyledTableCell>
                                                <StyledTableCell align="center">Latitude</StyledTableCell>
                                                <StyledTableCell align="center">Frequency</StyledTableCell>
                                                <StyledTableCell align="center">Locality</StyledTableCell>
                                                <StyledTableCell align="center">CommTech</StyledTableCell>
                                                <StyledTableCell align="center">Edit</StyledTableCell>
                                                <StyledTableCell align="center">Delete</StyledTableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {devices.map((device) => (
                                                <StyledTableRow key={device.Id}>
                                                    <StyledTableCell component="th" scope="row">
                                                        {device.Name}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="center">{device.Longitude}</StyledTableCell>
                                                    <StyledTableCell align="center">{device.Latitude}</StyledTableCell>
                                                    <StyledTableCell align="center">{device.Frequency}</StyledTableCell>
                                                    <StyledTableCell align="center">{device.Locality}</StyledTableCell>
                                                    <StyledTableCell align="center">{device.CommTech}</StyledTableCell>
                                                    <StyledTableCell align="center">
                                                        <Tooltip title="Edit">
                                                            <Link to={`/editDevice/${device.Id}`}>
                                                                <EditIcon />
                                                            </Link>
                                                        </Tooltip>
                                                    </StyledTableCell>
                                                    <StyledTableCell align="center">
                                                        <Tooltip title="Delete">
                                                            <IconButton onClick={() => handleDeleteDevice(device.Id)}>
                                                                <DeleteIcon />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </StyledTableCell>
                                                </StyledTableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            ) : (
                                <p>No devices found for this project.</p>
                            )}
                            <Snackbar
                                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                                open={open}
                                autoHideDuration={3000}
                                onClose={() => setOpen(false)}
                            >
                                <Alert onClose={() => setOpen(false)} severity="success" variant="filled">
                                    {message}
                                </Alert>
                            </Snackbar>
                        </div>
                    ))}
                </Grid>
            </Grid>
        </div>
    );
}

export default ProjectManagement;

