// TemperatureDisplay.js
import '../humidity/humidity.css'
import React, { useState, useEffect } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';
import firebase from 'firebase/compat/app';
import '../../firebase';


const Humidity = () => {
  const [hum, sethum] = useState(null);
  const {speak, cancel} = useSpeechSynthesis();

  useEffect(() => {
    const humRef = firebase.database().ref('hum');

    const handleHumidityChange = (snapshot) =>{
      const humidityValue = snapshot.val();
      sethum(humidityValue);
    }
    humRef.on('value', handleHumidityChange);

    // Clean up the listener when the component unmounts
    return () => {
      humRef.off('value', handleHumidityChange);
      cancel();
    };
  }, []); // Empty dependency array means this effect runs once on mount

  const handleSpeakButtonClick =()=>{
    if(hum !== null){
      speak({text: `Humidity is ${hum} percent`})
    }
  }

  return (
    <div className="humidity">
      <button onClick={handleSpeakButtonClick}><i class="fas fa-play"></i></button>
    </div>
  );
};

export default Humidity;
