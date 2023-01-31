import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import NewButton from "../../button/Button.js";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

const DeviceDeployment = () => {
  const [sensors, setSensors] = useState([]);
  const [frequency, setFrequency] = useState("");
  const [mode, setMode] = useState("");

  const handleSensorChange = e => {
    const selectedSensor = e.target.value;
    if (sensors.includes(selectedSensor)) {
      setSensors(sensors.filter(sensor => sensor !== selectedSensor));
    } else {
      setSensors([...sensors, selectedSensor]);
    }
  };

  return (
    <div>
      {/* <h1>Device Deployment</h1> */}
      <h2>Select Sensors</h2>

      <div style={{ padding: 15 }}>
        <FormGroup style={{fontSize: 30}}>
          <FormControlLabel control={<Checkbox />} label="Temperature" />
          <FormControlLabel control={<Checkbox />} label="Turbidity" />
          <FormControlLabel control={<Checkbox />} label="pH" />
          <FormControlLabel control={<Checkbox />} label="PO4" />
          <FormControlLabel control={<Checkbox />} label="Conductivity" />
        </FormGroup>
        {/* <div>
          <input
            type="checkbox"
            value="Sensor 1"
            onChange={handleSensorChange}
            checked={sensors.includes("Sensor 1")}
          />
          Temperature
        </div>
        <div>
          <input
            type="checkbox"
            value="Sensor 2"
            onChange={handleSensorChange}
            checked={sensors.includes("Sensor 2")}
          />
          Conductivity
        </div>
        <div>
          <input
            type="checkbox"
            value="Sensor 3"
            onChange={handleSensorChange}
            checked={sensors.includes("Sensor 3")}
          />
          PO4
        </div>
        <div>
          <input
            type="checkbox"
            value="Sensor 4"
            onChange={handleSensorChange}
            checked={sensors.includes("Sensor 4")}
          />
          Ph
        </div>
        <div>
          <input
            type="checkbox"
            value="Sensor 5"
            onChange={handleSensorChange}
            checked={sensors.includes("Sensor 5")}
          />
          Turbidity
        </div> */}
      </div>
      <h2>Frequency of Monitoring</h2>
      <div style={{ padding: 15 }}>
        {/* <input
          type="text"
          value={frequency}
          onChange={e => setFrequency(e.target.value)}
        /> */}
        <DropdownButton id="dropdown-basic-button" title="Select a time">
          <Dropdown.Item href="#/action-1">15 minutes</Dropdown.Item>
          <Dropdown.Item href="#/action-2">30 minutes</Dropdown.Item>
          <Dropdown.Item href="#/action-3">60 minutes</Dropdown.Item>
          <Dropdown.Item href="#/action-3">60 minutes</Dropdown.Item>
          <Dropdown.Item href="#/action-3">6 hours</Dropdown.Item>
          <Dropdown.Item href="#/action-3">12 hours</Dropdown.Item>
          <Dropdown.Item href="#/action-3">24 hours</Dropdown.Item>
        </DropdownButton>
      </div>

      <h2>Mode of Communication</h2>
      <div style={{ padding: 15 }}>

              <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label"></FormLabel>
                  <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="female"
                      name="radio-buttons-group"
                  >
                      <FormControlLabel value="female" control={<Radio />} label="GSM Module" />
                      <FormControlLabel value="male" control={<Radio />} label="LoRaWAN" />
                  </RadioGroup>
              </FormControl>
        {/* <div>
          <input
            type="radio"
            value="Radio 1"
            onChange={e => setMode(e.target.value)}
            checked={mode === "Radio 1"}
          />
          Radio 1
        </div>
        <div>
          <input
            type="radio"
            value="Radio 2"
            onChange={e => setMode(e.target.value)}
            checked={mode === "Radio 2"}
          />
          Radio 2
        </div> */}
      </div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <NewButton text="Deploy Device" />
          </div>

    </div>
  );
};

export default DeviceDeployment;
