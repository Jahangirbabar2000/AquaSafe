import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, Button, IconButton, Tooltip, Snackbar, Skeleton, Backdrop, Typography, TextField, Grid, Box, Paper, } from "@mui/material";
import Sidebar2 from "../sidebar/Sidebar2.js";
import { useParams, useNavigate } from "react-router-dom";
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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const mdTheme = createTheme();
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
    const navigate = useNavigate();

    const [project, setProject] = useState("");
    const [devices, setDevices] = useState([]);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);
    const [editBackdropOpen, setEditBackdropOpen] = useState(false);
    const [editedProject, setEditedProject] = useState({
        Name: "",
        Location: "",
        Country: "",
        Longitude: "",
        Latitude: "",
        Description: "",
    });
    useEffect(() => {
        getProjectDetails();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getProjectDetails = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8080/api/projects/${projectId}`
            );
            setProject(response.data);
            const devicesResponse = await axios.get(
                `http://localhost:8080/api/deployeddevices/byproject/${response.data.Name}`
            );
            setDevices(devicesResponse.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching project details:", error);
        }
    };

    const handleDeleteDevice = async (deviceId) => {
        try {
            await axios.delete(`http://localhost:8080/api/deployeddevices/${deviceId}`);
            setDevices(devices.filter((device) => device.Id !== deviceId));
            setOpen(true);
            setMessage("Device deleted successfully");
        } catch (error) {
            console.error("Error deleting device:", error);
        }
    };

    const handleDeleteProject = async () => {
        try {
            await axios.delete(`http://localhost:8080/api/project/${projectId}`);
            // Perform any additional actions after deleting the project            
            setOpen(true);
            setMessage("Project deleted successfully");
            closeDeleteDialog();
            navigate(`/projects`);
        } catch (error) {
            console.error("Error deleting project:", error);
        }

    };

    const handleEditProject = () => {
        setEditedProject(project);
        setEditBackdropOpen(true);
    };

    const handleSaveProject = async () => {
        try {
            await axios.put(`http://localhost:8080/api/projects/${projectId}`, editedProject);
            setProject(editedProject);
            setEditBackdropOpen(false);
        } catch (error) {
            console.error("Error updating project:", error);
        }
    };

    const handleCancelEdit = () => {
        setEditBackdropOpen(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedProject((prevProject) => ({
            ...prevProject,
            [name]: value,
        }));
    };
    const stopPropagation = (event) => {
        event.stopPropagation();
    };

    const openDeleteDialog = () => {
        setOpenDialog(true);
    };
    const closeDeleteDialog = () => {
        setOpenDialog(false);
    };
    return (
        <ThemeProvider theme={mdTheme}>
            <Navbar />
            <Box sx={{ backgroundColor: (theme) => theme.palette.grey[200], minHeight: '150vh' }}>
                <Grid mb={5} spacing={40} container>
                    <Grid item xs={4} sm={5} md={2}>
                        <Sidebar2 name="Dashboard" />
                    </Grid>
                    <Grid item xs={8} sm={7} md={9}>
                        <br />
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <h1 style={{ flex: 1 }}>Edit Project</h1>
                        </div>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={4}>
                                <div key={project.Id}>
                                    <Card variant="outlined" style={{ marginBottom: "20px" }}>
                                        <CardContent>
                                            <h2>Project Details</h2>
                                            {loading ? (
                                                <Skeleton variant="text" />
                                            ) : (
                                                <>
                                                    <Typography variant="body1" component="p">
                                                        Name: {project.Name}
                                                    </Typography>
                                                    <Divider style={{ margin: '5px 0' }} />
                                                    <Typography variant="body1" component="p">
                                                        Location: {project.Location}
                                                    </Typography>
                                                    <Divider style={{ margin: '5px 0' }} />
                                                    <Typography variant="body1" component="p">
                                                        Country: {project.Country}
                                                    </Typography>
                                                    <Divider style={{ margin: '5px 0' }} />
                                                    <Typography variant="body1" component="p">
                                                        Longitude: {project.Longitude}
                                                    </Typography>
                                                    <Divider style={{ margin: '5px 0' }} />
                                                    <Typography variant="body1" component="p">
                                                        Latitude: {project.Latitude}
                                                    </Typography>
                                                    <Divider style={{ margin: '10px 0' }} />
                                                    <Typography variant="body1" component="p">
                                                        Description: {project.Description}
                                                    </Typography>
                                                    <Divider style={{ margin: '10px 0' }} />
                                                    <Button
                                                        variant="contained"
                                                        color="secondary"
                                                        size="small"
                                                        onClick={() => openDeleteDialog()}
                                                    >
                                                        Delete Project
                                                    </Button>
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        size="small"
                                                        onClick={handleEditProject}
                                                        style={{ marginLeft: '10px' }}
                                                    >
                                                        Edit Project
                                                    </Button>
                                                </>
                                            )}
                                        </CardContent>

                                    </Card>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={8}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <h2>Devices</h2>
                                    <Button variant="contained" color="primary" size="small" onClick={() => navigate(-1)}>
                                        Go Back
                                    </Button>

                                </div>

                                {loading ? (
                                    <TableContainer component={Card}>
                                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                            <TableHead>
                                                <TableRow>
                                                    <StyledTableCell align="center">Name</StyledTableCell>
                                                    <StyledTableCell align="center">Longitude</StyledTableCell>
                                                    <StyledTableCell align="center">Latitude</StyledTableCell>
                                                    <StyledTableCell align="center">Frequency</StyledTableCell>
                                                    <StyledTableCell align="center">Edit</StyledTableCell>
                                                    <StyledTableCell align="center">Delete</StyledTableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {[1, 2, 3].map((index) => (
                                                    <StyledTableRow key={index}>
                                                        <StyledTableCell>
                                                            <Skeleton variant="text" />
                                                        </StyledTableCell>
                                                        <StyledTableCell>
                                                            <Skeleton variant="text" />
                                                        </StyledTableCell>
                                                        <StyledTableCell>
                                                            <Skeleton variant="text" />
                                                        </StyledTableCell>
                                                        <StyledTableCell>
                                                            <Skeleton variant="text" />
                                                        </StyledTableCell>
                                                        <StyledTableCell>
                                                            <Skeleton variant="circle" width={24} height={24} />
                                                        </StyledTableCell>
                                                        <StyledTableCell>
                                                            <Skeleton variant="circle" width={24} height={24} />
                                                        </StyledTableCell>
                                                    </StyledTableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                ) : devices.length > 0 ? (
                                    <TableContainer component={Card}>
                                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                            <TableHead>
                                                <TableRow>
                                                    <StyledTableCell align="center">Name</StyledTableCell>
                                                    <StyledTableCell align="center">Longitude</StyledTableCell>
                                                    <StyledTableCell align="center">Latitude</StyledTableCell>
                                                    <StyledTableCell align="center">Frequency</StyledTableCell>
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
                                                        <StyledTableCell align="center">
                                                            {device.Longitude}
                                                        </StyledTableCell>
                                                        <StyledTableCell align="center">
                                                            {device.Latitude}
                                                        </StyledTableCell>
                                                        <StyledTableCell align="center">
                                                            {device.Frequency}
                                                        </StyledTableCell>
                                                        <StyledTableCell align="center">
                                                            <Tooltip title="Edit">
                                                                <Link to={`/deviceDeployment?project=${project.Id}&deviceId=${device.Id}`}>
                                                                    <EditIcon />
                                                                </Link>
                                                            </Tooltip>
                                                        </StyledTableCell>
                                                        <StyledTableCell align="center">
                                                            <Tooltip title="Delete">
                                                                <IconButton
                                                                    onClick={() => handleDeleteDevice(device.Id)}
                                                                >
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
                                    <Alert
                                        onClose={() => setOpen(false)}
                                        severity="success"
                                        variant="filled"
                                    >
                                        {message}
                                    </Alert>
                                </Snackbar>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Backdrop
                    open={editBackdropOpen}
                    sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    onClick={handleCancelEdit}
                >
                    <Paper elevation={3} sx={{ padding: "20px", maxWidth: "30vw" }} onClick={stopPropagation}>
                        <Typography variant="h6" component="div" mb={2}>
                            Edit Project
                        </Typography>
                        <form>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        name="Name"
                                        label="Name"
                                        fullWidth
                                        value={editedProject.Name}
                                        onChange={handleChange}
                                        onMouseDown={(e) => e.stopPropagation()}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        name="Location"
                                        label="Location"
                                        fullWidth
                                        value={editedProject.Location}
                                        onChange={handleChange}
                                        onMouseDown={(e) => e.stopPropagation()}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        name="Country"
                                        label="Country"
                                        fullWidth
                                        value={editedProject.Country}
                                        onChange={handleChange}
                                        onMouseDown={(e) => e.stopPropagation()}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        name="Longitude"
                                        label="Longitude"
                                        fullWidth
                                        value={editedProject.Longitude}
                                        onChange={handleChange}
                                        onMouseDown={(e) => e.stopPropagation()}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        name="Latitude"
                                        label="Latitude"
                                        fullWidth
                                        value={editedProject.Latitude}
                                        onChange={handleChange}
                                        onMouseDown={(e) => e.stopPropagation()}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        name="Description"
                                        label="Description"
                                        fullWidth
                                        multiline
                                        rows={4}
                                        value={editedProject.Description}
                                        onChange={handleChange}
                                        onMouseDown={(e) => e.stopPropagation()}
                                    />
                                </Grid>
                            </Grid>
                        </form>
                        <Grid container justifyContent="flex-end" mt={2}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSaveProject}
                                style={{ marginRight: "10px" }}
                            >
                                Save
                            </Button>
                            <Button
                                variant="contained"
                                onClick={handleCancelEdit}
                                color="secondary"
                            >
                                Cancel
                            </Button>
                        </Grid>
                    </Paper>
                </Backdrop>
                <Dialog
                    open={openDialog}
                    onClose={closeDeleteDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Delete Project Confirmation"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            This action will permanently delete the project, all its deployed devices and all the readings from those devices. Are you sure?
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
                            onClick={handleDeleteProject}
                        >
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </ThemeProvider>
    );
}

export default ProjectManagement;
