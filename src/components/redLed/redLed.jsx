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
    }, []);

    const handleSpeakButtonClick = ()=>{
      if(redLed === 1){
        speak({text: 'The red led is turned on'})
      } else {
        speak({text: 'The red led is turned off'})
      }
    }

    const toggleChangerClick = () => {
      // Toggle the value of redLed
      const redLedRef = firebase.database().ref('redLed');
      redLedRef.set(redLed === 1 ? 0 : 1);
    };
  return (
    <div className="redLed">
      <button onClick={handleSpeakButtonClick}><i className="fa fa-play"></i></button>
      <button onClick={toggleChangerClick}><i className="fa fa-refresh"></i></button>
      <h1>RedLed: {redLed === 1 ? 'ON' : 'OFF'}</h1>
    </div>
  );
};

export default RedLed;
