// feederatureDisplay.js
import '../feed/feed.css'
import React, { useState, useEffect } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';
import firebase from 'firebase/compat/app';
import '../../firebase';


const Feed = () => {
  const [feed, setfeed] = useState(null);
  const {speak, cancel} = useSpeechSynthesis();

  useEffect(() => {
    const feedRef = firebase.database().ref('feed');

    const handleFeed = (snapshot) => {
      const feedValue = snapshot.val();
      setfeed(feedValue);
    }
    feedRef.on('value', handleFeed);
    return()=>{
      feedRef.off('value', handleFeed);
      cancel();
    }
  }, []);
    
  const handleSpeakButtonClick = ()=>{
    if(feed === 1){
      speak({text: `It is time feeding`})
    } else {
      speak({text: `No feeding today`})
    }
  }

  const toggleChangerClick = () =>{
    const feedRef = firebase.database().ref('feed');
    feedRef.set(feed === 1 ? 0 : 1);
  }

  return (
    <div className="feed">
      <button onClick={handleSpeakButtonClick}><i class="fa fa-play"></i></button>
      <button onClick={toggleChangerClick}><i class ="fa fa-refresh"></i></button>
      <h1>Feed: {feed === 1 ? "ON" : 'OFF'}</h1>
    </div>
  );
};

export default Feed;
