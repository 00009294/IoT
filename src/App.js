import React from 'react';
import './App.css';
import Temperature from './components/temperature/temperature';
import Humidity from './components/humidity/humidity'
import WaterLevel from './components/waterLevel/waterLevel'
import Feed from './components/feed/feed';
import GreenLed from './components/greenLed/greenLed';
import RedLed from './components/redLed/redLed';
import logo from './static/feeding.gif'
import Watering from './components/watering/watering';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Temperature />
        <Humidity />
        <WaterLevel />
      </header>
      <div className='body'>
        <img src={logo} style={{width: 750, height: 300, borderRadius: 15,}} alt='....' />
      </div>
      <header className="App-header">
        <Feed />
        <GreenLed />
        <RedLed />
        <Watering />
      </header>
    </div>
  );
}

export default App;
