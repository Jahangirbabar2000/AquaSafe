import React, { useRef } from "react";
import Button from "@mui/material/Button";
import { readString } from "react-papaparse";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const CsvUploadButton = () => {
    const fileInputRef = useRef();

    const handleError = (err) => {
        console.error("Error while parsing file:", err);
        setSnackbar({
            open: true,
            message: "Error parsing CSV file",
            severity: "error",
        });
    };

    const [snackbar, setSnackbar] = React.useState({
        open: false,
        message: "",
        severity: "success",
    });

    const handleCloseSnackbar = () => {
        setSnackbar({
            ...snackbar,
            open: false,
        });
    };
    const handleOpen = () => {
        fileInputRef.current.click();
    };

    const handleFileUpload = async (results, projectName, deviceName) => {

        const readings = {
            projectName,
            deviceName,
            data: results.data,
        };

        console.log(readings)
        try {
            await axios.post("http://localhost:8080/readings/upload", readings);
            setSnackbar({
                open: true,
                message: "Data uploaded successfully!",
                severity: "success",
            });
        } catch (error) {
            console.error("Error uploading data", error);
            setSnackbar({
                open: true,
                message: "Error uploading data",
                severity: "error",
            });
        }
    };



    const readCSV = (file) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            const content = e.target.result;
            const lines = content.split('\n');

            // Extract and set the Project Name and Device Name
            const projectNameLine = lines[0].split(",");
            const deviceNameLine = lines[1].split(",");

            const actualHeader = lines[3]; // Get the fourth row
            const data = lines.slice(4).join('\n'); // Get the remaining rows (skip the first four)

            readString(actualHeader + '\n' + data, {
                header: true,
                dynamicTyping: true,
                complete: (results) => handleFileUpload(results, projectNameLine[1], deviceNameLine[1]),
                error: handleError,
            });
        };
        reader.onerror = (e) => {
            console.error("FileReader error", e);
            setSnackbar({
                open: true,
                message: "Error reading CSV file",
                severity: "error",
            });
        };

        reader.readAsText(file);
    };




    const handleFileChange = (e) => {
        const file = e.target.files[0];
        readCSV(file);
    };

    return (
        <div>
            <Button                
                variant="contained"
                style={{
                    marginLeft: "20%",
                    marginTop: "10px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                }}
                onClick={handleOpen}
            >
                Upload Data
            </Button>
            <input
                type="file"
                accept=".csv"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
            />
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={snackbar.severity}
                    variant="filled"
                    sx={{ width: "100%" }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default CsvUploadButton;
