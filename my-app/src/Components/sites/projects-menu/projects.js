import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import IconButton from "@material-ui/core/IconButton";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import Typography from "@material-ui/core/Typography";
import "./projects.css";

const data = {
  countries: [
    {
      name: "Pakistan",
      states: [
        {
          name: "Islamabad",
          lakes: [
            { name: "Rawal Lake", coordinates: '33.704196, 73.127151' },
            { name: "Nust Lake", coordinates: '33.639924, 72.991497' }
          ]
        },
        {
          name: "Lahore",
          lakes: [
            { name: "Lahore Canal", coordinates: '31.456612, 74.225711' }
          ]
        }
      ]
    },
    {
      name: "India",
      states: [
        {
          name: "Delhi",
          lakes: [
            { name: "Yamuna River", coordinates: '26.919072, 78.603781' },
            { name: "Sanjay Lake", coordinates: '28.614334, 77.299822' }
          ]
        },
        {
          name: "Mumbai",
          lakes: [
            { name: "Tulsi Lake", coordinates: '19.191272, 72.917397' },
            { name: "Pawai Lake", coordinates: '19.126180, 72.902860' }
          ]
        }
      ]
    },
    {
      name: "Bangladesh",
      states: [
        {
          name: "Dhaka",
          lakes: [
            { name: "Turag River", coordinates: '23.908079, 90.333078' },
            { name: "Hatir Jheel", coordinates: '23.768993, 90.416165' }
          ]
        },
        {
          name: "Chattogram",
          lakes: [
            { name: "Sangu River", coordinates: '21.836432, 92.417387' },
            { name: "Kaptai Lake", coordinates: '22.673598, 92.161764' }
          ]
        }
      ]
    },
  ]
};

function ProjectMenu(props) {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedProject, setSelectedProject] = useState("");

  const availableState = data.countries.find((c) => c.name === selectedCountry);
  const availableProjects = availableState?.states?.find(
    (s) => s.name === selectedCity
  );



  const handleClick = () => {
    console.log("HIIIIIII");
  };

  const handleClick1 = () => {
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
          <option className="option-projects" value="" disabled selected>
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
          onChange={(e) => setSelectedCity(e.target.value)}
          disabled={!selectedCountry}
        >
          <option className="option-projects" value="" disabled selected>
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
          <option className="option-projects" value="" disabled selected>
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
        <IconButton aria-label="delete" onClick={handleClick1}>
          <CancelRoundedIcon className="icon" size="small" />
          <Typography className="icon" variant="body1">
            {" "}
            clear
          </Typography>
        </IconButton>
        <Button
          variant="primary"
          className="project-search btn-lg"
          onClick={handleClick}
        >
          Search Project
        </Button>
      </div>

    </div>
  );
}

export default ProjectMenu;