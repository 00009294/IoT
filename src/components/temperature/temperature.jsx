// TemperatureDisplay.js
import '../temperature/temperature.css'
import React, { useState, useEffect } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';
import firebase from 'firebase/compat/app';
import '../../firebase';

const Temperature = () => {
  const [temp, setTemp] = useState(null);
  const { speak, cancel } = useSpeechSynthesis();


  useEffect(() => {
    const tempRef = firebase.database().ref('temp');

    const handleTemparature = (snapshot) =>{
      const tempValue = snapshot.val();
      setTemp(tempValue);
    }
    tempRef.on('value', handleTemparature);

    return()=>{
      tempRef.off('value', handleTemparature);
      cancel();
    }
    }, []);

    const handleSpeakButtonClick = () =>{
      if(temp !== null){
        speak({text: `Temperature is ${temp} percent`})
      }
    }

    
  return (
    <div className="temperature">
      <button onClick={handleSpeakButtonClick}><i class="fas fa-play"></i></button>
    </div>
  );
};

export default Temperature;
