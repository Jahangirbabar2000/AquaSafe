import React, { useState, useEffect } from "react";
import axios from "axios";
import { CSVLink } from "react-csv";
import Button from "@mui/material/Button";

const CsvDownloadButton = () => {
  const [parameterNames, setParameterNames] = useState([]);

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

  const names = parameterNames.map(item => item.Name);

  const csvReport = {
    filename: "template.csv",
    headers: names,
    data: [],
  };

  return (
    <Button
      variant="contained"
      style={{
        marginLeft: "1%",
        padding: "0.5%",
        marginTop: "10px"
      }}
    >
      <CSVLink
        style={{
          textDecoration: "none",
          width: "100%",
          color: "white"
        }}
        {...csvReport}
      >
        Download Template
      </CSVLink>
    </Button>
  );
};

export default CsvDownloadButton;
