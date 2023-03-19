import * as React from 'react';

import "./App.css";
import Routes from './Components/routes';
import Projects from './Components/Projects/projects.js'

function App() {
  return (
    <div className="main">
      <Projects />
    </div>
  );
}

export default App;