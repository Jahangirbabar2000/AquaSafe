import * as React from 'react';
import Footer from './Components/navbarFooter/Footer'
import "./App.css";
import Routes from './Components/routes';
import Device from "./Components/devices/devices.js"


function App() {
  return (
    <div className="main">
    <Device />
      {/* <Routes /> */}
      {/* <Footer /> */}
    </div >
  );
}

export default App;