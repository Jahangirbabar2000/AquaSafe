import { React, useState } from "react";
import { CSVLink } from "react-csv";
import Button from "@mui/material/Button";

const CsvDownloadButton = () => {

  //Retrieve the Names of the parameters from the database.
  //I have already written a function in index.js (backend)
  //The retrieved data should look like this.
  //Set this retrieved data equal to the variable "data" given below
  const data = [
    { Name: "Oxygen" },
    { Name: "pH" },
    { Name: "Nitrogen" },
    { Name: "CO2" }
  ];
    const [parameterNames, setParameterNames] = useState(data);
  

    // Code to retrieve parameter names

    // const getParameterNames = async (req, res) => {
    //     res = await axios.get("http://localhost:8080/parameterNames");
    //     console.log(res.data);
    //     setParametersData(res.data);
    // };

    const names = parameterNames.map(item => item.Name);

  const csvReport = {
    filename: "template.csv",
    headers: names, // Use the names array as headers
    data: data,
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
      {" "}
          <CSVLink style={{
              textDecoration: "none",
              width: "100%",
              color: "white"

          }} {...csvReport}>Download Template</CSVLink>
    </Button>
  );
};

export default CsvDownloadButton;
