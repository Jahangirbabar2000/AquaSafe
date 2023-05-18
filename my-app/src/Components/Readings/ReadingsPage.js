import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar2 from "../sidebar/Sidebar2.js";
import Navbar from "../navbar/navbar.js";
import ReadingsTable from "./ReadingsTable.js";
import "./Readings.css";
import CsvDownloadButton from "./CsvDownloadButton.js";
import CsvUploadButton from "./CsvUploadButton .js";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

export default function ReadingsPage() {
  const [projectList, setProjectList] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState("1");

  useEffect(() => {
    axios
      .get("http://localhost:8080/projects")
      .then((response) => {
        setProjectList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
      });
  }, []);

  const handleProjectChange = (event) => {
    setSelectedProjectId(event.target.value);
  };

  return (
    <div>
      <Navbar />
      <div style={{ display: "grid", gridTemplateColumns: "28vh auto" }}>
        <div>
          <Sidebar2 name="Readings" />
        </div>
        <div style={{ marginLeft: 150, marginTop: 10 }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <CsvDownloadButton />
            <CsvUploadButton />

            <div style={{ marginLeft: 550, marginTop: 30 }}>
              <FormControl
                variant="outlined"
                size="small"
                style={{ minWidth: 120, marginBottom: "16px", marginLeft: "10px" }}
              >
                <InputLabel htmlFor="project-select">Project</InputLabel>
                <Select
                  id="project-select"
                  label="Project"
                  value={selectedProjectId}
                  onChange={handleProjectChange}
                >
                  {projectList.map((project) => (
                    <MenuItem key={project.Id} value={project.Id}>
                      {project.Name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
          {<ReadingsTable Id={selectedProjectId} />}
        </div>
      </div>
    </div>
  );
}
