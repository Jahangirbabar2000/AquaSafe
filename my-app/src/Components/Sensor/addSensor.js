import React, { useState } from "react";
import Sidebar from "../sidebar/side-bar.js";
import Navbar from "../navbar/navbar.js";

function AddSensor() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [unit, setUnit] = useState("");

  const [min, setMin] = useState("");
  const [max, setMax] = useState("");

  const nameChange = event => {
    setName(event.target.value);
    console.log(name);
  };

  const typeChange = event => {
    setType(event.target.value);
  };

  const unitChange = event => {
    setUnit(event.target.value);
  };
  const minChange = event => {
    setMin(event.target.value);
  };
  const maxChange = event => {
    setMax(event.target.value);
  };

  return (
    <div>
      <Navbar />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "32vh auto",
          gridGap: "2px"
        }}
      >
        <div>
          <Sidebar />
        </div>
        <div style={{ background: "lightblue", padding: "16px" }}>
          <div>
            <h1
              style={{
                textAlign: "center",
                paddingBottom: "20px",
                paddingTop: "10px"
              }}
            >
              Add a New Sensor
            </h1>
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <h3> Sensor Name </h3>
            <input type="text" value={name} onChange={nameChange} />
          </div>

                  <div style={{ display: "flex", flexDirection: "row" }}>
                      <h3> Sensor Type </h3>
                      <input type="text" value={type} onChange={typeChange} />
                  </div>

                  <div style={{ display: "flex", flexDirection: "row" }}>
                      <h3> Sensor Unit </h3>
                      <input type="text" value={unit} onChange={unitChange} />
                  </div>

                  <div style={{ display: "flex", flexDirection: "row" }}> 
                  <div>
                      <h3>Min</h3>
                      <input type="text" value={min} onChange={minChange} />
                      </div>

                      <div>
                          <h3>Max</h3>
                          <input type="text" value={max} onChange={maxChange} />
                      </div>

                  </div>
        </div>
      </div>
    </div>
  );
}

export default AddSensor;

// const TextInput = (props) => {
//     return <div style={{display: flex}}>
//         <h3>{props.text}</h3>

//     </div>;
// };
