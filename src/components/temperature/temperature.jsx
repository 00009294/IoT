// TemperatureDisplay.js
import '../temperature/temperature.css'
import React, { useState, useEffect } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';
import firebase from 'firebase/compat/app';
import '../../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

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
      <button onClick={handleSpeakButtonClick}><i class="fa fa-play"></i></button>
      <div className = "bar">
      <CircularProgressbar value={temp} text={`${temp}%`} />
      </div>
      <h1>Temperature: {temp !== null ? temp.toString() : 'Loading'}% </h1>
      </div>
  );
};

export default Temperature;
