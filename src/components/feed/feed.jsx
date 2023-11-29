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
    if(feed ==true){
      speak({text: `Now, it is time feeding`})
    } else {
      speak({text: `Go out, no feeding today`})
    }
  }

  return (
    <div className="feed">
      <button onClick={handleSpeakButtonClick}><i class="fas fa-play"></i></button>
      <h1>Feed: {feed !== null ? feed.toString() : 'Loading...'}</h1>
    </div>
  );
};

export default Feed;
