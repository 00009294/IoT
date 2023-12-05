// waterLeveleratureDisplay.js
import '../waterLevel/waterLevel.css'
import React, { useState, useEffect } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';
import firebase from 'firebase/compat/app';
import '../../firebase';

const WaterLevel = () => {
  const [waterLevel, setwaterLevel] = useState(null);
  const { speak, cancel } = useSpeechSynthesis();

  useEffect(() => {
    const waterLevelRef = firebase.database().ref('waterLevel');

    const handleWaterLevelChange = (snapshot) => {
      const waterLevelValue = snapshot.val();
      setwaterLevel(waterLevelValue);
    };
    waterLevelRef.on('value', handleWaterLevelChange);

   return () => {
      waterLevelRef.off('value', handleWaterLevelChange);
      cancel(); // Cancel any ongoing speech when the component unmounts
    };
  }, []); // Empty dependency array means this effect runs once on mount

  const handleSpeakButtonClick = () => {
    if (waterLevel !== null) {
      speak({ text: `Water level is ${waterLevel} percent` });
    }
  };

  return (
    <div className="waterLevel">
      <button onClick={handleSpeakButtonClick}><i class = "fa fa-play"></i></button>
      <h1>Water: {waterLevel !== null ? waterLevel.toString() : 'Loading...'}% </h1>
    </div>
  );
};

export default WaterLevel;
