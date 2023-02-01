import * as React from 'react';
import Footer from './Components/navbarFooter/Footer'
import "./App.css";
import Routes from './Components/routes';
import Device from "./Components/devices/devices.js"
import AddSensor from "./Components/Sensor/addSensor";


function App() {
  return (
    <div className="main">
    <AddSensor />
      {/* <Routes /> */}
      {/* <Footer /> */}
    </div >
  );
}

export default App;