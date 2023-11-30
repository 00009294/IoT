// greenLederatureDisplay.js
import '../greenLed/greenLed.css'
import React, { useState, useEffect } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';
import firebase from 'firebase/compat/app';
import '../../firebase';


const GreenLed = () => {
  const [greenLed, setgreenLed] = useState(null);
  const {speak, cancel}  =useSpeechSynthesis();

  useEffect(() => {
    const greenLedRef = firebase.database().ref('greenLed');

    const handleGreenLed =  (snapshot) => {
      const greenLedValue = snapshot.val();
      setgreenLed(greenLedValue);
    }
    greenLedRef.on('value', handleGreenLed);

    return()=>{
      greenLedRef.off('value', handleGreenLed);
      cancel();
    }
  },[]);

  const handleSpeakButtonClick = ()=>{
    if(greenLed === true){
      speak({text: 'The green led is turned on'})
    } else{
      speak({text: 'The green led is turned off'})
    }
  }

  const toggleChangerClick = () => {
    // Toggle the value of redLed
    const greenLedRef = firebase.database().ref('greenLed');
    greenLedRef.set(!greenLed);
  };

  return (
    <div className="greenLed">
    <button onClick={handleSpeakButtonClick}><i class="fa fa-play"></i></button>
    <button onClick={toggleChangerClick}><i class="fa fa-refresh"></i></button>
      <h1>GreenLed: {greenLed === true ? "ON" : 'OFF'}</h1>
    </div>
  );
};

export default GreenLed;
