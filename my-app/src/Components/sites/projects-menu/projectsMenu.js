import React, { useState, useEffect } from "react";
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import Typography from '@mui/material/Typography';
import "./projects.css";

function ProjectMenu(props) {

  const [projectList, setProjectList] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedProject, setSelectedProject] = useState("");

  useEffect(() => {
    // Make Axios request to fetch project details from the backend
    axios
      .get('/projects')
      .then((response) => {
        setProjectList(response.data);
      })
      .catch((error) => {
        console.error('Error fetching projects:', error);
      });
  }, []);

  // Group the data by country
  const groupedByCountry = projectList.reduce((acc, curr) => {
    const { Country, Location, Name, Longitude, Latitude } = curr;

    // Find the country in the accumulator
    let country = acc.find((c) => c.name === Country);

    // If the country doesn't exist, create it
    if (!country) {
      country = { name: Country, states: [] };
      acc.push(country);
    }

    // Find the state in the country
    let state = country.states.find((s) => s.name === Location);

    // If the state doesn't exist, create it
    if (!state) {
      state = { name: Location, lakes: [] };
      country.states.push(state);
    }

    // Add the lake to the state
    const coordinates = `${Latitude}, ${Longitude}`;
    const lake = { name: Name, coordinates };
    state.lakes.push(lake);

    return acc;
  }, []);

  // Create the final data object
  const data = { countries: groupedByCountry };
  const availableState = data.countries.find((c) => c.name === selectedCountry);
  const availableProjects = availableState?.states?.find(
    (s) => s.name === selectedCity
  );

  useEffect(() => {
    const project = projectList.find(project => project.Name === selectedProject);
    if (project) {
      props.setSelectedProjectId(project.Id);
    }
  }, [selectedProject, projectList]);

  const handleClear = () => {
    setSelectedCity("");
    setSelectedCountry("");
    setSelectedProject("");
  };
  return (
    <div id="container-projects">
      <div>
        <select
          className="select-projects"
          placeholder="Country"
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          style={{ fontSize: 12 }}
        >
          <option className="option-projects" value="" disabled>
            Select Country
          </option>
          {data.countries.map((value, key) => (
            <option className="option-projects" value={value.name} key={key}>
              {value.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <select
          className="select-projects"
          placeholder="City"
          value={selectedCity}
          onChange={(e) => {
            setSelectedCity(e.target.value);
            setSelectedProject("");
          }}
          disabled={!selectedCountry}
        >
          <option className="option-projects" value="" disabled>
            Select City
          </option>
          {availableState?.states.map((value, key) => (
            <option className="option-projects" value={value.name} key={key}>
              {value.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <select
          className="select-projects"
          placeholder="Project"
          value={selectedProject}
          onChange={(e) => {
            setSelectedProject(e.target.value);
            const selectedLake = availableProjects?.lakes.find(lake => lake.name === e.target.value);
            if (selectedLake) {
              props.setSelectedCoordinates(selectedLake.coordinates.split(',').map(coord => Number(coord)));
            } else {
              props.setSelectedCoordinates([]);
            }
          }}
          disabled={!selectedCity}
        >
          <option className="option-projects" value="" disabled>
            Select Project
          </option>
          {availableProjects?.lakes.map((lake, key) => (
            <option className="option-projects" value={lake.name} key={key}>
              {lake.name}
            </option>
          ))}
        </select>
      </div>

      <div className="buttons-div">
        <IconButton aria-label="delete" onClick={handleClear}>
          <CancelRoundedIcon className="icon" style={{ fontSize: 20, marginRight: 4 }} />
          <Typography className="icon" variant="h6" >
            clear
          </Typography>
        </IconButton>
      </div>
    </div>
  );
}

export default ProjectMenu;