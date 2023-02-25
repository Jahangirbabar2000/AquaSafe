import * as React from 'react';
import Footer from './Components/footer/Footer'
import "./App.css";
import Routes from './Components/routes';

function App() {
  return (
    <div className="main">
      {/* <AddSensor /> */}
      <Routes />
      {/* <Footer /> */}
    </div>
  );
}

export default App;