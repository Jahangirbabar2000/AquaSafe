import "./projects.css";
import * as React from "react";
import Button from "@mui/material/Button";
import IconButton from "@material-ui/core/IconButton";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import Typography from "@material-ui/core/Typography";

const data = {
  countries: [
    {
      name: "Pakistan",
      states: [
        {
          name: "Islamabad",
          cities: ["Rawal Lake", "Nust Lake"]
        },
        {
          name: "Lahore",
          cities: ["Lahore Canal"]
        }
      ]
    },
    {
      name: "India",
      states: [
        { name: "Delhi", cities: ["Yamuna River", "Sanjay Lake"] },
        { name: "Mumbai", cities: ["Tulsi Lake", "Pawai Lake"] }
      ]
    },
    {
      name: "Bangladesh",
      states: [
        { name: "Dhaka", cities: ["Turag River", "Gulshan Lake"] },
        { name: "Chattogram", cities: ["Sangu River", "Kaptai Lake"] }
      ]
    }

  ]
};
export default function ProjectMenu() {
  const [selectedCountry, setSelectedCountry] = React.useState();
  const [selectedCity, setSelectedCity] = React.useState();
  const [selectedProject, setSelectedProject] = React.useState();

  const availableState = data.countries.find((c) => c.name === selectedCountry);
  const availableProjects = availableState?.states?.find(
    (s) => s.name === selectedCity
  );

  function handleClick() {
    console.log("Country: ", selectedCountry);
    console.log("City: ", selectedCity);
    console.log("Project: ", selectedProject);
  }

  function handleClick1() {
    setSelectedCity("");
    setSelectedCountry("");
    setSelectedProject("");
  }

  return (
    <div id="container-projects">
      {/* <p style={{ color: "white", fontSize: "2em", paddingRight: 75 }}>
        Search Project
      </p> */}
      <div>
        <select
          className="select-projects"
          placeholder="Country"
          value={selectedCountry}
          onChange={e => setSelectedCountry(e.target.value)}
          style={{ fontSize: 12 }}
        >
          <option className="option-projects" value="" disabled selected>
            Select Country
          </option>
          {data.countries.map((value, key) => {
            return (
              <option className="option-projects" value={value.name} key={key}>
                {value.name}
              </option>
            );
          })}
        </select>
      </div>

      <div>
        {/* <label>City</label> */}
        <select
          className="select-projects"
          style={{ fontSize: 12 }}
          placeholder="City"
          value={selectedCity}
          onChange={e => setSelectedCity(e.target.value)}
        >
          <option className="option-projects" value="" disabled selected>
            Select City
          </option>
          {availableState?.states.map((e, key) => {
            return (
              <option className="option-projects" value={e.name} key={key}>
                {e.name}
              </option>
            );
          })}
        </select>
      </div>

      <div>
        {/* <label>Project</label> */}

        <select
          className="select-projects"
          style={{ fontSize: 12 }}
          placeholder="Project"
          value={selectedProject}
          onChange={e => setSelectedProject(e.target.value)}
        >
          <option className="option-projects" value="" disabled selected>
            Select Project
          </option>
          {availableProjects?.cities.map((e, key) => {
            return (
              <option className="option-projects" value={e.name} key={key}>
                {e}
              </option>
            );
          })}
        </select>
      </div>
      <div
        id="clearButton"
        style={{
          display: "flex",
          flexDirection: "row"
        }}
      >
        <IconButton aria-label="delete" onClick={handleClick1}>
          <CancelRoundedIcon className="icon" size="small" />
          <Typography className="icon" variant="body1">
            {" "}
            clear
          </Typography>
        </IconButton>
      </div>
      <Button
        variant="contained"
        size="large"
        sx={{ marginTop: 0.1, marginLeft: "1%", fontSize: 12 }}
        onClick={handleClick}
      >
        Search Project
      </Button>
    </div>
  );
}