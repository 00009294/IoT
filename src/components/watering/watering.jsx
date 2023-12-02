// wateringeratureDisplay.js
import '../watering/watering.css'
import { useSpeechSynthesis } from 'react-speech-kit';
import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import '../../firebase';


const Watering = () => {
  const [watering, setwatering] = useState(null);
  const {speak, cancel} = useSpeechSynthesis();

  useEffect(() => {
    const wateringRef = firebase.database().ref('watering');

    const handlewatering = (snapshot) => {
      const wateringValue = snapshot.val();
      setwatering(wateringValue);
    }
    wateringRef.on('value', handlewatering);

    return()=>{
      wateringRef.off('value', handlewatering);
      cancel();
    } 
    }, []);

    const handleSpeakButtonClick = ()=>{
      if(watering === 1){
        speak({text: 'The watering is turned on'})
      } else {
        speak({text: 'The watering is turned off'})
      }
    }

    const toggleChangerClick = () => {
      // Toggle the value of watering
      const wateringRef = firebase.database().ref('watering');
      wateringRef.set(watering === 1 ? 0 : 1);
    };
  return (
    <div className="watering">
      <button onClick={handleSpeakButtonClick}><i className="fa fa-play"></i></button>
      <button onClick={toggleChangerClick}><i className="fa fa-refresh"></i></button>
      <h1>Watering: {watering === 1 ? 'ON' : 'OFF'}</h1>
    </div>
  );
};

export default Watering;
