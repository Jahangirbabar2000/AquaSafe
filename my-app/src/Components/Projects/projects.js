import React from 'react'
import projects from "./projects.json";

function ProjectsCard(props){
    const project = props.projectEntry;
    return (
      <div className="project-card">
        <h1>{project.projectName}</h1>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <p>{project.country}</p>
          <p>{project.city}</p>
        </div>
        <p>{project.devices}</p>
      </div>
    );
}

export default function Projects(){
    return (
      <div sx={{ zIndex: 100 }} className="">
        {projects.map(data => (
          <div className="one-notification-container" key={entry.id}>
            <ProjectsCard projectEntry={data} />
          </div>
        ))}
      </div>
    );
}