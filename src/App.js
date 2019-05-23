import React from 'react';
import './App.css';
import Restaraunts from './Components/Restaraunts.js';
//import Map from './Components/Map.js';

class App extends React.Component {

  render() {
    return (
      <div className="App">
        <Restaraunts />
        {/* <Map /> */}
      </div>
    );
  }
}

export default App;
