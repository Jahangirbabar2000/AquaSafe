import React, { useEffect, useState } from "react";
import MainLayout from "../Layout/MainLayout";
import ReadingsTable from "./ReadingsTable";
import CsvDownloadButton from "./CsvDownloadButton";
import CsvUploadButton from "./CsvUploadButton .js";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { projectsAPI } from "../../services/api";

/**
 * ReadingsPage - Displays sensor readings with CSV import/export functionality
 */
const ReadingsPage = () => {
  const [projectList, setProjectList] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await projectsAPI.getAll();
        setProjectList(response.data);
        if (response.data.length > 0) {
          setSelectedProjectId(response.data[0].Id);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  const handleProjectChange = (event) => {
    setSelectedProjectId(event.target.value);
  };

  return (
    <MainLayout sidebarName="Readings">
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
          mb: 3,
        }}
      >
        <CsvDownloadButton />
        <CsvUploadButton />
        <Box sx={{ ml: { xs: 0, md: "auto" } }}>
          <FormControl variant="outlined" size="small" sx={{ minWidth: 200 }}>
            <InputLabel id="project-select-label">Project</InputLabel>
            <Select
              id="project-select"
              labelId="project-select-label"
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
        </Box>
      </Box>
      {selectedProjectId && <ReadingsTable Id={selectedProjectId} />}
    </MainLayout>
  );
};

export default ReadingsPage;
