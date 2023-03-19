import React from "react";
import projects from "./projects.json";
import "./projects.css";
import Stack from "@mui/material/Stack";
function ProjectsCard(props) {
  const project = props.projectEntry;
  return (
    <div className="project-card">
      <h1>{project.projectName}</h1>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <p>{project.country}</p>
        <p>{project.city}</p>
      </div>
      <p>{project.devices} Devices</p>
    </div>
  );
}

export default function Projects() {
  return (
      <div sx={{ zIndex: 100 }}  className="">
          <Stack direction="row" spacing={0} style={{ maxWidth: "80vw", display: "flex", flexWrap: "wrap" }}>
        {projects.map(data => (
        //   <Item>
            <div className="" key={data.id}>
              <ProjectsCard projectEntry={data} />
            </div>
        //   </Item>
        ))}
      </Stack>
    </div>
  );
}
