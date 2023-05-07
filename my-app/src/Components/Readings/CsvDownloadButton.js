import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Divider from '@mui/material/Divider';

const CsvDownloadButton = () => {
  const [parameterNames, setParameterNames] = useState([]);
  const [selectedParameters, setSelectedParameters] = useState([]);
  const [open, setOpen] = useState(false);
  const [uniqueParameters, setUniqueParameters] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState('');


  // Create a function to fetch the list of projects
  const getProjects = async () => {
    try {
      const res = await axios.get("http://localhost:8080/projects");
      setProjects(res.data);
    } catch (error) {
      console.error("Error fetching projects", error);
    }
  };

  const getDevices = async (projectName) => {
    try {
      const res = await axios.get(`http://localhost:8080/api/deployeddevices/byproject/${projectName}`);
      setDevices(res.data);
    } catch (error) {
      console.error("Error fetching devices", error);
    }
  };

  // Add a function to handle project selection
  const handleProjectChange = (event) => {
    setSelectedProject(event.target.value);
    const selectedProjectName = projects.find((project) => project.Id === event.target.value)?.Name;
    if (selectedProjectName) {
      getDevices(selectedProjectName);
    }
  };

  const handleDeviceChange = (event) => {
    setSelectedDevice(event.target.value);
  };

  // Function to retrieve parameter names
  const getParameterNames = async () => {
    try {
      const res = await axios.get("http://localhost:8080/parameters");
      setParameterNames(res.data);
    } catch (error) {
      console.error("Error fetching parameter names", error);
    }
  };

  // Fetch parameter names on component mount
  useEffect(() => {
    getParameterNames();
  }, []);

  // Fetch projects on component mount
  useEffect(() => {
    getProjects();
  }, []);


  useEffect(() => {
    const uniqueParams = parameterNames.reduce((acc, param) => {
      if (!acc.find((p) => p.Name === param.Name)) {
        acc.push(param);
      }
      return acc;
    }, []);
    setUniqueParameters(uniqueParams);
  }, [parameterNames]);


  const handleChange = (event) => {
    const paramName = event.target.name;
    if (event.target.checked) {
      setSelectedParameters((prevSelected) => [
        ...prevSelected,
        { Name: paramName, Unit: "" },
      ]);
    } else {
      setSelectedParameters((prevSelected) =>
        prevSelected.filter((param) => param.Name !== paramName)
      );
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDownload = () => {
    setOpen(false);
    const link = document.createElement("a");
    link.href = csvUrl;
    link.download = `${selectedProjectName}_${selectedDeviceName}_template.csv`;
    link.click();
  };


  const handleUnitChange = (name, event) => {
    setSelectedParameters((prevSelected) =>
      prevSelected.map((param) =>
        param.Name === name ? { ...param, Unit: event.target.value } : param
      )
    );
  };

  const selectedProjectName = projects.find((project) => project.Id === selectedProject)?.Name;
  const selectedDeviceName = devices.find((device) => device.Id === selectedDevice)?.Name;

  const csvData = [
    ["Project Name:", selectedProjectName],
    ["Device Name:", selectedDeviceName],
    [],
    ["Date", ...selectedParameters.map((param) => `${param.Name}_(${param.Unit})`)],
    [],
  ];



  const csvString = csvData
    .map((row) => row.map((cell) => `"${cell || ""}"`).join(","))
    .join("\r\n");

  const BOM = "\uFEFF";
  const csvBlob = new Blob([BOM + csvString], { type: "text/csv;charset=utf-8;" });
  const csvUrl = URL.createObjectURL(csvBlob);




  return (
    <div>
      <Button
        variant="contained"
        style={{
          marginLeft: "5%",
          marginRight: "5%",
          padding: "1%",
          marginTop: "10px",
        }}
        onClick={handleClickOpen}
      >
        Download Template
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Select Project and Parameters</DialogTitle>
        <DialogContent>
          <FormControl
            variant="outlined"
            size="small"
            style={{ minWidth: 120, marginBottom: "16px", marginTop: "5px" }}
          >
            <InputLabel>Project</InputLabel>
            <Select label="Project" value={selectedProject || ''} onChange={handleProjectChange}>
              {projects.map((project) => (
                <MenuItem key={project.Id} value={project.Id}>
                  {project.Name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl
            variant="outlined"
            size="small"
            style={{ minWidth: 120, marginBottom: "16px", marginTop: "5px", marginLeft: "2vh" }}
          >
            <InputLabel>Device</InputLabel>
            <Select label="Device" value={selectedDevice || ''} onChange={handleDeviceChange}>
              {devices.map((device) => (
                <MenuItem key={device.Id} value={device.Id}>
                  {device.Name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Divider style={{ margin: "16px 0" }} />

          {selectedProject && selectedDevice &&
            uniqueParameters.map((parameter, index) => {
              const parameterUnits = parameterNames
                .filter((param) => param.Name === parameter.Name)
                .map((param) => param.Unit);
              return (
                <div key={parameter.Name} style={{ display: "flex", alignItems: "center", marginBottom: "16px" }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedParameters.some((param) => param.Name === parameter.Name)}
                        onChange={handleChange}
                        name={parameter.Name}
                      />
                    }
                    label={parameter.Name}
                  />
                  <FormControl
                    variant="outlined"
                    size="small"
                    style={{ minWidth: 120, marginLeft: "auto" }}
                  >
                    <InputLabel>Unit</InputLabel>
                    <Select
                      label="Unit"
                      value={
                        (selectedParameters.find((param) => param.Name === parameter.Name)?.Unit) || ''
                      }
                      onChange={(event) => handleUnitChange(parameter.Name, event)}
                    >
                      {parameterUnits.map((unit) => (
                        <MenuItem key={unit} value={unit}>
                          {unit}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              );
            })}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDownload}>Download</Button>
        </DialogActions>
      </Dialog>

    </div>
  );



};

export default CsvDownloadButton;