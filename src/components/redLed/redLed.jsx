// redLederatureDisplay.js
import '../redLed/redLed.css'
import { useSpeechSynthesis } from 'react-speech-kit';
import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import '../../firebase';


const RedLed = () => {
  const [redLed, setredLed] = useState(null);
  const {speak, cancel} = useSpeechSynthesis();

  useEffect(() => {
    const redLedRef = firebase.database().ref('redLed');

    const handleRedLed = (snapshot) => {
      const redLedValue = snapshot.val();
      setredLed(redLedValue);
    }
    redLedRef.on('value', handleRedLed);

    return()=>{
      redLedRef.off('value', handleRedLed);
      cancel();
    } 
    },[]);

    const handleSpeakButtonClick = ()=>{
      if(redLed == true){
        speak({text: 'It is red'})
      } else {
        speak({text: 'It is not red'})
      }
    }

  return (
    <div className="redLed">
      <button onClick={handleSpeakButtonClick}><i class="fas fa-play"></i></button>
      <h1>RedLed: {redLed !== null ? redLed.toString() : 'Loading...'}</h1>
    </div>
  );
};

export default RedLed;
