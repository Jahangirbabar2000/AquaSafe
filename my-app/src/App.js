import * as React from 'react';
import Navbar from './Components/navbarFooter/Navbar'
import Footer from './Components/navbarFooter/Footer'
import "./App.css";
import Routes from './Components/routes';

function App() {
  return (
    <div className="main">
      <Routes />
      <Footer />
    </div >
  );
}

export default App;