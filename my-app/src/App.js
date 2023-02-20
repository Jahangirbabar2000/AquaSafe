import * as React from 'react';
import Footer from './Components/footer/Footer'
import "./App.css";
import Routes from './Components/routes';
import Device from "./Components/devices/devices.js"
import AddSensor from "./Components/Sensor/addSensor";
import NewProject from "./Components/NewProjectForm/NewProject.js"
import ProjectMenu from "./Components/projects-menu/projects.js";
// import NestedList from "./Components/projects-menu/projectmenuTest.js";

function App() {
  return (
    <div className="main">
      {/* <AddSensor /> */}
      <ProjectMenu />
      {/* <Footer /> */}
    </div>
  );
}

export default App;