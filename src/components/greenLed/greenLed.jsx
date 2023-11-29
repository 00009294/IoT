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
  }, []);

  const handleSpeakButtonClick = ()=>{
    if(greenLed == true){
      speak({text: 'Feeding time..... Corn and water are adding, let\'s feeding.'})
    } else{
      speak({text: 'No corn, no water'})
    }
  }

  return (
    <div className="greenLed">
    <button onClick={handleSpeakButtonClick}><i class="fas fa-play"></i></button>
      <h1>GreenLed: {greenLed !== null ? greenLed.toString() : 'Loading...'}</h1>
    </div>
  );
};

export default GreenLed;
